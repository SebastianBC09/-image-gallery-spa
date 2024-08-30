import React from 'react';
import useImageGallery from '../hooks/useImageGallery';
import { ImageGallery } from '../types/components.ts';

const ImagesGallery: React.FC<ImageGallery> = ({ children }) => {
  const { displayedImages, loading, lastImageElementRef } = useImageGallery();

  return (
    <div className="flex flex-row flex-wrap justify-center gap-[20px]">
      {displayedImages.map((image, index) => (
        <div key={image.id} ref={index === displayedImages.length - 1 ? lastImageElementRef : null}>
          {children(image, index === displayedImages.length - 1 ? lastImageElementRef : null)}
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ImagesGallery;