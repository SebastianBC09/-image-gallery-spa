import React from 'react';
import SearchBar from '../components/SearchBar.tsx'
import ImageCard from '../components/ImageCard.tsx'
import ImageGallery from '../components/ImageGallery';
import { Image } from '../types/components.ts';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search Query:', query);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch}/>
      <ImageGallery searchQuery={searchQuery}>
        {(image: Image) => (
          <ImageCard {...image} />
        )}
      </ImageGallery>
    </>
  );
};

export default HomePage;