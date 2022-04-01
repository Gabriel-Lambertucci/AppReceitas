import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { getLocalStorage,
  setLocalStorage,
  filterLocalStorage } from '../../helpers/localStorageHelper';

function DrinkRecipe(props) {
  const { match: { params: { id } } } = props;
  const videoCode = -11;
  const maxRecommended = 6;
  const [drink, setDrink] = useState([]);
  const [arrayFavorites, setArrayFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(() => {
    const result = getLocalStorage('favoriteRecipes');
    if (result) {
      const bool = result.some((item) => item.id === id);
      return bool;
    }
    return false;
  });

  useEffect(() => {
    (async () => {
      const DRINK_BY_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(DRINK_BY_ID);
      const data = await response.json();
      console.log(data);
      const { drinks } = data;
      setDrink(drinks);
    })();
  }, []);

  const [food, setFood] = useState([]);
  useEffect(() => {
    (async () => {
      const FOOD_RECOMMENDED = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(FOOD_RECOMMENDED);
      const data = await response.json();
      const { meals } = data;
      setFood(meals);
    })();
  }, []);

  const includeFavorite = () => {
    console.log(isFavorite);
    const { idDrink,
      strCategory, strAlcoholic, strDrink, strDrinkThumb } = drink[0];
    const Favoritedrink = [{
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    }];
    setLocalStorage('favoriteRecipes', ...Favoritedrink);
    setArrayFavorites([...arrayFavorites, ...Favoritedrink]);
    setIsFavorite(true);
  };

  const removeFavorite = () => {
    console.log(isFavorite);
    filterLocalStorage('favoriteRecipes', id);
    setIsFavorite(false);
  };

  return (
    <div>
      {console.log(drink)}
      {
        drink.map((item, index) => (
          <div key={ index }>
            <div>
              <img
                data-testid="recipe-photo"
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                style={ { width: '150px' } }
              />
            </div>
            <div>
              <h2 data-testid="recipe-title">{ item.strDrink }</h2>
              <p data-testid="recipe-category">{ item.strAlcoholic }</p>
            </div>
            <div>
              <button data-testid="share-btn" type="button">
                <img src={ shareIcon } alt="Share Icon" />
              </button>
              <input
                type="image"
                data-testid="favorite-btn"
                alt="Heart Icon"
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                onClick={ isFavorite === false
                  ? () => includeFavorite()
                  : () => removeFavorite() }
              />
            </div>
            <div>
              Ingredients
              <ul>
                {(Object.keys(item).filter((el) => el.includes('Measure') && item[el]))
                  .map((el, index1) => (
                    <li
                      key={ index1 }
                      data-testid={ `${index1}-ingredient-name-and-measure` }
                    >
                      {`${item[el]}`}
                    </li>
                  ))}
              </ul>
              <ul>
                {(Object.keys(item).filter((e) => e.includes('Ingredient') && item[e]))
                  .map((e, index1) => (
                    <li
                      key={ index1 }
                      data-testid={ `${index1}-ingredient-name-and-measure` }
                    >
                      {`${item[e]}`}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              Instructions
              <p data-testid="instructions">{item.strInstructions}</p>
            </div>
            { item.strVideo ? (
              <div>
                Video
                <iframe data-testid="video" title={ item.strDrink } src={ `https://www.youtube.com/embed/${(item.strYoutube).slice(videoCode)}` } />
              </div>) : null }
          </div>
        ))
      }
      <div>
        Recommended
        <div>
          {console.log(food)}
          {food.map(({ strMeal, strMealThumb }, index2) => (
            index2 < maxRecommended
            && (
              <div data-testid={ `${index2}-recomendation-card` } key={ index2 }>
                <p data-testid={ `${index2}-recomendation-title` }>{ strMeal }</p>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                />
              </div>
            )
          ))}
        </div>
      </div>
      <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
    </div>
  );
}

DrinkRecipe.propTypes = {
  match: PropTypes.string.isRequired,
};

export default DrinkRecipe;
