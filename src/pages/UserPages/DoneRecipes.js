import React, { useState } from 'react';
import Header from '../../components/Header';
import { getLocalStorage } from '../../helpers/localStorageHelper';

function DoneRecipes() {
  const [state, setState] = useState({
    favoritesList: getLocalStorage('favoriteRecipes'),
    favoriteFilteredList: getLocalStorage('favoriteRecipes'),
  });

  const handleSearchInputChange = async ({ target: { value } }) => {
    if (value === 'all') {
      setState({ ...state, favoriteFilteredList: state.favoritesList });
    } if (value === 'food' || value === 'drink') {
      setState({ ...state,
        favoriteFilteredList: state.favoritesList
          .filter((obj) => obj.type === value) });
    }
  };
  return (
    <div id="main">
      <Header value="Done Recipes" img="false" />
      <div>
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ (event) => handleSearchInputChange(event) }
        >
          All
        </button>
        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ (event) => handleSearchInputChange(event) }
        >
          Food
        </button>
        <button
          type="button"
          name="drink"
          value="drink"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleSearchInputChange(event) }
        >
          Drinks
        </button>
      </div>
      {state.favoriteFilteredList
        .map((item, index) => (
          <div key={ index } className="card">
            <img
              className="imgObj"
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt={ item.image }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.alcoholicOrNot !== '' ? item.alcoholicOrNot
                : `${item.nationality} - ${item.category}`}
            </p>
            <h1 data-testid={ `${index}-horizontal-name` }>{ item.name }</h1>
          </div>
        ))}
    </div>
  );
}

export default DoneRecipes;
