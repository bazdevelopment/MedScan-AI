/* eslint-disable new-cap */
import Busboy from 'busboy';
import { Request } from 'firebase-functions/v1/https';
import { buffer } from 'stream/consumers';

interface FilePart {
  fieldName: string;
  filename: string;
  buf: Buffer;
}

interface ParsedParts {
  fields: Record<string, string>;
  files: FilePart[];
}

export function processUploadedFile(req: Request): Promise<ParsedParts> {
  const busboy = Busboy({ headers: req.headers });

  const fields: Record<string, string> = {};
  const files: Array<{
    fieldName: string;
    filename: string;
    buf: Promise<Buffer>;
  }> = [];

  // Handle fields in the form data
  busboy.on('field', (fieldName, val) => {
    fields[fieldName] = val;
  });

  // Handle file uploads
  busboy.on('file', (fieldName, file, { filename }) => {
    if (filename) {
      files.push({ fieldName, filename, buf: buffer(file) });
    } else {
      file.resume(); // Ignore file if no filename is provided
    }
  });

  // Return a promise that resolves when parsing is complete
  return new Promise<ParsedParts>((resolve) => {
    busboy.on('finish', async () => {
      // Wait for all buffers to be resolved and assign to each file part
      const buffers = await Promise.all(files.map((file) => file.buf));
      const resolvedFiles: FilePart[] = files.map((file, index) => ({
        fieldName: file.fieldName,
        filename: file.filename,
        buf: buffers[index],
      }));

      resolve({ fields, files: resolvedFiles });
    });

    busboy.end(req.rawBody);
  });
}
