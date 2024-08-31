import React from 'react';
import logo from '../assets/logo.svg';
import { Searchbar } from '../types/components.ts'

const SearchBar: React.FC<Searchbar> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <header className="w-auto h-[180px] bg-white flex flex-row justify-between items-center mb-[40px] px-[12.4%]">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <search>
        <form onSubmit={handleSubmit}>
          <input placeholder="You're looking for something?" value={query} onChange={handleInputChange} />
        </form>
      </search>
    </header>
  )
}

export default SearchBar;