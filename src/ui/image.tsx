import type { ImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import * as React from 'react';

import TapToViewLabel from '@/components/tap-to-view-label';

export type ImgProps = ImageProps & {
  className?: string;
  onTapToView?: () => void;
};

cssInterop(NImage, { className: 'style' });

export const Image = ({
  style,
  className,
  placeholder = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
  onTapToView,
  ...props
}: ImgProps) => {
  return (
    <>
      <NImage
        className={className}
        placeholder={placeholder}
        style={style}
        {...props}
      />
      {!!onTapToView && (
        <TapToViewLabel
          onTapToView={onTapToView}
          className="absolute bottom-16 right-6"
        />
      )}
    </>
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
