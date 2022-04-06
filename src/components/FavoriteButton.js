import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  filterLocalStorage,
  getLocalStorage,
  setLocalStorage } from '../helpers/localStorageHelper';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ localState, favProps, datatest }) {
  const [arrayFavorites, setArrayFavorites] = useState([]);
  const { localId } = localState;
  const [isFavorite, setIsFavorite] = useState(() => {
    const result = getLocalStorage('favoriteRecipes');
    if (result && result.length !== 0) {
      const bool = result.some((item) => item.id === localId);
      return bool;
    }
    return false;
  });

  const includeFavorite = () => {
    const {
      favId,
      favType,
      favNationality,
      favCategory,
      favAlcoholicOrNot,
      favName,
      favImage } = favProps;
    const favoriteDrink = [{
      id: favId,
      type: favType,
      nationality: favNationality,
      category: favCategory,
      alcoholicOrNot: favAlcoholicOrNot,
      name: favName,
      image: favImage,
    }];
    setLocalStorage('favoriteRecipes', ...favoriteDrink);
    setArrayFavorites([...arrayFavorites, ...favoriteDrink]);
    setIsFavorite(true);
  };

  const removeFavorite = () => {
    filterLocalStorage('favoriteRecipes', localId);
    setIsFavorite(false);
  };

  console.log(datatest);

  return (
    <input
      type="image"
      data-testid={ datatest
        ? `${datatest}` : 'favorite-btn' }
      alt="Heart Icon"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ isFavorite === false
        ? () => includeFavorite()
        : () => removeFavorite() }
    />
  );
}

FavoriteButton.propTypes = {
  localState: PropTypes.shape({
    localId: PropTypes.string.isRequired,
  }).isRequired,
  favProps: PropTypes.shape({
    favId: PropTypes.string.isRequired,
    favType: PropTypes.string.isRequired,
    favNationality: PropTypes.string.isRequired,
    favCategory: PropTypes.string.isRequired,
    favAlcoholicOrNot: PropTypes.string.isRequired,
    favName: PropTypes.string.isRequired,
    favImage: PropTypes.string.isRequired,
  }).isRequired,
  datatest: PropTypes.string.isRequired,
};

export default FavoriteButton;
