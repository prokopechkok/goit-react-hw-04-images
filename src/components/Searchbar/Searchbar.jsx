import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';

import {
  SearchFormButton,
  SearchFormInput,
  SearchbarForm,
  SearchbarHeader,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (!searchQuery.trim()) {
      return alert('Please enter your query word!');
    }

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    const { searchQuery } = this.state;

    return (
      <SearchbarHeader>
        <SearchbarForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FiSearch size="16px" />
          </SearchFormButton>
          <SearchFormInput
            onChange={this.handleChange}
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
  }
}
