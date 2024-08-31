import React from 'react';
import logo from '../assets/logo.svg';
import { Searchbar } from '../types/components.ts'

const SearchBar: React.FC<Searchbar> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className="w-auto h-[180px] bg-white flex flex-row justify-between items-center mb-[40px] px-[12.4%]">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <search>
          <input placeholder="You're looking for something?" onChange={handleInputChange} />
      </search>
    </header>
  )
}

export default SearchBar;