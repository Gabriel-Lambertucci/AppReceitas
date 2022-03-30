import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByCategory } from '../redux/reducers/filterReducer';

function NavBar() {
  const dispatch = useDispatch();

  const [categories, setcategories] = useState({
    filterByCategory: '',
  });

  const handleRadioButtonChange = ({ target: { checked, value } }) => {
    if (checked === true) {
      console.log(value);
      return setcategories(value);
    } return setcategories('');
  };

  return (
    <div>
      <form>
        <label htmlFor="radio-btn-filter">
          Ingredient&apos;s:
          <input
            name="radio-btn-filter"
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingredients"
            onChange={ (e) => handleRadioButtonChange(e) }
          />
          Name:
          <input
            name="radio-btn-filter"
            type="radio"
            data-testid="name-search-radio"
            value="name"
            onChange={ (e) => handleRadioButtonChange(e) }
          />
          First letter:
          <input
            name="radio-btn-filter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ (e) => handleRadioButtonChange(e) }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => dispatch(filterByCategory(categories)) }
        >
          FILTER
        </button>
      </form>
    </div>
  );
}

export default NavBar;
