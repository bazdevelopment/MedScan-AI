import type { ImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { cssInterop } from 'nativewind';
import * as React from 'react';

import TapToViewLabel from '@/components/tap-to-view-label';

export type ImgProps = ImageProps & {
  className?: string;
  onTapToView?: () => void;
  showAdditionalInfo?: boolean;
};

cssInterop(NImage, { className: 'style' });

export const Image = ({
  style,
  className,
  placeholder = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
  onTapToView,
  showAdditionalInfo,
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
          className={`absolute ${showAdditionalInfo ? 'bottom-16' : 'bottom-6'} right-6`}
        />
      )}
    </>
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
