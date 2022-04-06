import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import '../../style/Favorite.css';
import { favoritesPageLocalStorage } from '../../helpers/localStorageHelper';

function FavoriteRecipes() {
  const [favoriteFilteredList, setFilteredList] = useState([]);
  const handleSearchInputChange = async ({ target: { value } }) => {
    if (value === 'all') {
      const favoritesList = favoritesPageLocalStorage('favoriteRecipes', '');
      setFilteredList(favoritesList);
    } if (value === 'food' || value === 'drink') {
      const favoritesList = favoritesPageLocalStorage('favoriteRecipes', '');
      const result = favoritesList
        .filter((obj) => obj.type === value);
      setFilteredList(result);
    }
  };
  useEffect(() => {
    const favoritesList = favoritesPageLocalStorage('favoriteRecipes', '');
    setFilteredList(favoritesList);
  }, []);
  const renderFather = () => {
    const favoritesList = favoritesPageLocalStorage('favoriteRecipes', '');
    setFilteredList(favoritesList);
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
      {favoriteFilteredList ? favoriteFilteredList
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
              isFavoriteProp
              renderFather={ renderFather }
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
              link={ item.type !== 'food' ? `/drinks/${item.id}`
                : `/foods/${item.id}` }
            />
          </div>
        )) : <h4>There is no Favorites Recipes!</h4>}
    </div>
  );
}
export default FavoriteRecipes;
