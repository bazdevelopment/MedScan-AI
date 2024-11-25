interface ScanExample {
  name: string;
  image: string;
  explanation: string;
}

interface ScanType {
  id: number;
  name: string;
  fullName: string;
  examples: ScanExample[];
}

export const SCAN_CATEGORIES: ScanType[] = [
  {
    id: 1,
    name: 'X-Ray',
    fullName: 'X-Ray Imaging',
    examples: [
      {
        name: 'Chest X-ray',
        image: 'scans/chest-xray.jpg',
        explanation:
          'Examines lungs, heart, and chest wall for pneumonia, heart failure, or fractures',
      },
      {
        name: 'Bone X-ray',
        image: 'scans/bone-xray.jpg',
        explanation:
          'Shows bone fractures, alignment issues, or joint problems',
      },
      {
        name: 'Dental X-ray',
        image: 'scans/dental-xray.jpg',
        explanation: 'Reveals tooth decay, bone loss, and cavity development',
      },
      {
        name: 'Joint X-ray',
        image: 'scans/joint-xray.jpg',
        explanation:
          'Evaluates joint spaces and bone alignment for arthritis or injuries',
      },
      {
        name: 'Skull X-ray',
        image: 'scans/skull-xray.jpg',
        explanation: 'Examines skull structure for fractures or abnormalities',
      },
    ],
  },
  {
    id: 2,
    name: 'MRI',
    fullName: 'Magnetic Resonance Imaging',
    examples: [
      {
        name: 'Brain MRI',
        image: 'scans/brain-mri.jpeg',
        explanation:
          'Detailed imaging of brain structure to detect tumors, bleeding, inflammation, or developmental issues',
      },
      {
        name: 'Spine MRI',
        image: 'scans/spine-mri.jpg',
        explanation:
          'Examines spinal cord, disks, and vertebrae to diagnose herniated discs or spinal cord conditions',
      },
      {
        name: 'Joint MRI',
        image: 'scans/joint-mri.jpg',
        explanation:
          'Visualizes joint structures to assess injuries, arthritis, or other joint disorders',
      },
      {
        name: 'Cardiac MRI',
        image: 'scans/cardiac-mri.jpg',
        explanation:
          'Provides detailed images of heart structure and function to evaluate heart disease',
      },
      {
        name: 'Abdominal MRI',
        image: 'scans/abdominal-mri.jpg',
        explanation:
          'Images organs in the abdomen to detect tumors, inflammation, or other abnormalities',
      },
    ],
  },
  {
    id: 3,
    name: 'CT',
    fullName: 'Computed Tomography',
    examples: [
      {
        name: 'Head CT',
        image: 'scans/head-ct.webp',
        explanation:
          'Creates detailed cross-sections of brain to detect bleeding, tumors, or stroke',
      },
      {
        name: 'Chest CT',
        image: 'scans/chest-ct.jpg',
        explanation:
          'Detailed imaging of lungs and chest structures for cancer, infections, or blood clots',
      },
      {
        name: 'Abdominal CT',
        image: 'scans/abdominal-ct.webp',
        explanation:
          'Examines internal organs for inflammation, infection, or tumors',
      },
      {
        name: 'Spine CT',
        image: 'scans/spine-ct.jpg',
        explanation:
          'Shows detailed spine structure to diagnose herniated discs or fractures',
      },
      {
        name: 'Cardiac CT',
        image: 'scans/cardiac-ct.jpg',
        explanation:
          'Evaluates heart structure and coronary arteries for blockages',
      },
    ],
  },
  {
    id: 4,
    name: 'PET',
    fullName: 'Positron Emission Tomography',
    examples: [
      {
        name: 'Brain PET',
        image: 'scans/brain-pet.jpeg',
        explanation:
          'Shows brain activity patterns to diagnose dementia or locate tumors',
      },
      {
        name: 'Full Body PET',
        image: 'scans/full-body-pet.jpg',
        explanation:
          'Detects cancer spread throughout the body and evaluates treatment response',
      },
      {
        name: 'Cardiac PET',
        image: 'scans/cardiac-pet.jpg',
        explanation:
          'Assesses blood flow to heart muscle and cardiac metabolism',
      },
      {
        name: 'Oncology PET',
        image: 'scans/oncology-pet.jpg',
        explanation:
          'Identifies cancer locations and monitors treatment effectiveness',
      },
      {
        name: 'Neurological PET',
        image: 'scans/neuro-pet.jpg',
        explanation:
          "Evaluates brain function in conditions like epilepsy or Alzheimer's",
      },
    ],
  },
  {
    id: 5,
    name: 'Ultra',
    fullName: 'Ultrasound',
    examples: [
      {
        name: 'Pregnancy',
        image: 'scans/pregnancy-ultrasound.jpg',
        explanation: 'Monitors fetal development and health during pregnancy',
      },
      {
        name: 'Cardiac',
        image: 'scans/cardiac-ultrasound.jpg',
        explanation: 'Examines heart structure and function in real-time',
      },
      {
        name: 'Abdominal',
        image: 'scans/abdominal-ultrasound.jpg',
        explanation: 'Views organs like liver, gallbladder, and kidneys',
      },
      {
        name: 'Breast',
        image: 'scans/breast-ultrasound.jpg',
        explanation: 'Investigates breast lumps and supplements mammography',
      },
      {
        name: 'Thyroid',
        image: 'scans/thyroid-ultrasound.jpg',
        explanation: 'Examines thyroid gland for nodules or abnormalities',
      },
    ],
  },
  {
    id: 6,
    name: 'Nuclear',
    fullName: 'Nuclear Medicine',
    examples: [
      {
        name: 'Bone Scan',
        image: 'scans/bone-nuclear.jpg',
        explanation: 'Detects bone cancer, infections, or fractures',
      },
      {
        name: 'Thyroid Scan',
        image: 'scans/thyroid-nuclear.jpg',
        explanation: 'Evaluates thyroid function and structure',
      },
      {
        name: 'MUGA Scan',
        image: 'scans/muga-scan.jpg',
        explanation: 'Assesses heart function and blood flow',
      },
      {
        name: 'Gallium Scan',
        image: 'scans/gallium-scan.jpg',
        explanation: 'Identifies inflammation, infection, or tumors',
      },
      {
        name: 'Renal Scan',
        image: 'scans/renal-scan.jpg',
        explanation: 'Evaluates kidney function and blood flow',
      },
    ],
  },
];
