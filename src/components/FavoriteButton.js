import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  filterLocalStorage,
  getLocalStorage,
  setLocalStorage } from '../helpers/localStorageHelper';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({
  localState,
  favProps,
  datatest,
  isFavoriteProp,
  renderFather }) {
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

  const heartIcon = () => {
    if (isFavoriteProp) {
      return blackHeartIcon;
    }
    return isFavorite ? blackHeartIcon : whiteHeartIcon;
  };

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
    return ((renderFather !== undefined) && renderFather());
  };

  const removeFavorite = () => {
    filterLocalStorage('favoriteRecipes', localId);
    setIsFavorite(false);
    return ((renderFather !== undefined) && renderFather());
  };

  console.log(datatest);

  return (
    <input
      type="image"
      data-testid={ !datatest
        ? 'favorite-btn' : `${datatest}` }
      alt="Heart Icon"
      src={ heartIcon() }
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
  isFavoriteProp: PropTypes.bool.isRequired,
  renderFather: PropTypes.func.isRequired,
};

export default FavoriteButton;
