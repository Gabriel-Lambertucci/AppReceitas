import React, { useState } from 'react';
import Header from '../../components/Header';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import { getLocalStorage } from '../../helpers/localStorageHelper';
import '../../style/Favorite.css';

function FavoriteRecipes() {
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

  const aHref = (item) => (item.type !== 'food' ? `http://localhost:3000/drinks/${item.id}` : `http://localhost:3000/foods/${item.id}`);

  return (
    <div id="main">
      <Header value="Favorite Recipes" img="false" />
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
      {state.favoriteFilteredList ? state.favoriteFilteredList
        .map((item, index) => (
          <div key={ index }>
            <div>
              <a
                href={ aHref(item) }
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
                href={ aHref(item) }
              >
                <h1
                  data-testid={ `${index}-horizontal-name` }
                >
                  { item.name }

                </h1>
              </a>
            </div>
            <FavoriteButton
              datatest={ `${index}-horizontal-favorite-btn` }
              localState={ { localId: item.id } }
              favProps={ {
                favId: item.id,
                favType: item.type,
                favNationality: item.nationality,
                favCategory: item.category,
                favAlcoholicOrNot: item.alcoholicOrNot,
                favName: item.name,
                favImage: item.image } }
            />
            <ShareButton
              datatest={ `${index}-horizontal-share-btn` }
              link={ item.type !== 'food' ? `http://localhost:3000/drinks/${item.id}`
                : `http://localhost:3000/foods/${item.id}` }
            />
          </div>
        )) : null}
    </div>
  );
}

export default FavoriteRecipes;
