import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import {
  SearchFormButton,
  SearchFormInput,
  SearchbarForm,
  SearchbarHeader,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return alert('Please enter your query word!');
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <SearchbarHeader>
      <SearchbarForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FiSearch size="16px" />
        </SearchFormButton>
        <SearchFormInput
          onChange={handleChange}
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
          value={searchQuery}
        />
      </SearchbarForm>
    </SearchbarHeader>
  );
};
