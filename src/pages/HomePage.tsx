import React from 'react';
import SearchBar from '../components/SearchBar.tsx'
import ImageCard from '../components/ImageCard.tsx'
import ImageGallery from '../components/ImageGallery';
import { Image } from '../types/components.ts';

const HomePage: React.FC = () => {
  const onSearch = () => {
    console.log('onSearch');
  }
  return (
    <>
      <SearchBar onSearch={onSearch}/>
      <ImageGallery>
        {(image: Image) => (
          <ImageCard {...image} />
        )}
      </ImageGallery>
    </>
  );
};

export default HomePage;