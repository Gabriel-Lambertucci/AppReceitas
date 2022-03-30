import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByCategory, filterByText } from '../redux/reducers/filterReducer';

function NavBar() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState({
    isFiltering: false,
    searchByText: '',
    searchByCategory: '',
  });
  const [url, setUrl] = useState('');

  function fetchChange(byText, byButton) {
    // const dispatch = useDispatch();

    let link;
    if (byButton === 'ingredients') {
      link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${byText}`;
      setUrl(link);
    }
    if (byButton === 'name') {
      link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${byText}`;
      setUrl(link);
    }
    if (byButton === 'first-letter') {
      link = `https://www.themealdb.com/api/json/v1/1/search.php?f=${byText}`;
      setUrl(link);
    }

    const apiFetch = async (paramURL) => {
      const response = await fetch(paramURL);
      const data = await response.json();
      console.log(data);
      return data;
    };

    return (
      url ? apiFetch(url) : null
    );
  }

  const handleFilterSubmit = () => {
    dispatch(filterByCategory(categories.searchByCategory));
    dispatch(filterByText(categories.searchByText));
    fetchChange(categories.searchByText, categories.searchByCategory);
  };

  const handleRadioButtonChange = ({ target: { checked, value } }) => (
    checked && setCategories({ ...categories, searchByCategory: value })
  );

  const handleSearchInputChange = ({ target: { value } }) => {
    setCategories({ ...categories, searchByText: value });
  };

  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            placeholder="Search recipe"
            data-testid="search-input"
            value={ categories.searchByText }
            onChange={ (e) => handleSearchInputChange(e) }
          />
        </div>
        <label htmlFor="radio-btn-filter">
          <input
            name="radio-btn-filter"
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingredients"
            onChange={ (e) => handleRadioButtonChange(e) }
          />
          Ingredient&apos;s:
          <input
            name="radio-btn-filter"
            type="radio"
            data-testid="name-search-radio"
            value="name"
            onChange={ (e) => handleRadioButtonChange(e) }
          />
          Name:
          <input
            name="radio-btn-filter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ (e) => handleRadioButtonChange(e) }
          />
          First letter:
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleFilterSubmit() }
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default NavBar;
