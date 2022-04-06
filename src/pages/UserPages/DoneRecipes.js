import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ShareButton from '../../components/ShareButton';
import { getLocalStorage } from '../../helpers/localStorageHelper';
import '../../style/Favorite.css';

function FavoriteRecipes() {
  const [state, setState] = useState({
    favoritesList: getLocalStorage('doneRecipes'),
    favoriteFilteredList: getLocalStorage('doneRecipes'),
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
      <Header value="Done Recipes" />
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
          <div key={ index }>
            <div>
              <a
                href={ item.type !== 'food' ? `http://localhost:3000/drinks/${item.id}`
                  : `http://localhost:3000/foods/${item.id}` }
              >
                <img
                  className="imgObj"
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt={ item.image }
                  href="https://www.google.com.br"
                />
              </a>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {item.alcoholicOrNot !== '' ? item.alcoholicOrNot
                  : `${item.nationality} - ${item.category}`}
              </p>
              <a
                href={ item.type !== 'food' ? `http://localhost:3000/drinks/${item.id}`
                  : `http://localhost:3000/foods/${item.id}` }
              >
                <h1
                  data-testid={ `${index}-horizontal-name` }
                >
                  { item.name }

                </h1>
              </a>
            </div>
            <ShareButton
              datatest={ `${index}-horizontal-share-btn` }
              link={ item.type !== 'food' ? `http://localhost:3000/drinks/${item.id}`
                : `http://localhost:3000/foods/${item.id}` }
            />
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
