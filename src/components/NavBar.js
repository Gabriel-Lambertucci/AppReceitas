import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataFetchAPIFood } from '../redux/reducers/dataReducer';
import { filterByCategory, filterByText } from '../redux/reducers/filterReducer';

function NavBar() {
  const firstLetter = 'first-letter';
  const dispatch = useDispatch();
  // Categoria de Filtros:
  const [categories, setCategories] = useState({
    isFiltering: false,
    searchByText: '',
    searchByCategory: '',
  });
  // Categoria de url para fetch
  const [url, setUrl] = useState('');
  // Condicional de uso - url x fetch:
  function fetchChange(byText, byButton) {
    if (isFood && byButton === 'ingredients') {
      setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${byText}`);
    } if (isFood && byButton === 'name') {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${byText}`);
    } if (isFood && byButton === firstLetter) {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${byText}`);
    } if (!isFood && byButton === 'ingredients') {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${byText}`);
    } if (!isFood && byButton === 'name') {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${byText}`);
    } if (!isFood && byButton === firstLetter) {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${byText}`);
    }
  }
  // setando o fetch com seu devido condicional de uso para cada filtro:
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((state) => dispatch(dataFetchAPIFood(state)))
      .catch((error) => console.log(error));
  }, [url, dispatch]);
  // Manipula botão de Submit dos filtros:
  const handleFilterSubmit = () => {
    dispatch(filterByCategory(categories.searchByCategory));
    dispatch(filterByText(categories.searchByText));
    fetchChange(categories.searchByText, categories.searchByCategory);
  };
  // Manipula valores estipulados para filtros dos Radio Buttons:
  const handleRadioButtonChange = ({ target: { checked, value } }) => (
    checked && setCategories({ ...categories, searchByCategory: value })
  );
  // Manipula valores estipulados filtros do input de texto:
  const handleSearchInputChange = ({ target: { value } }) => {
    if (categories.searchByCategory === firstLetter && value.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
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
