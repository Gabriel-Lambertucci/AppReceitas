import React, { useEffect, useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { setLocalStorage } from '../../helpers/localStorageHelper';
// import HorizontalScroll from 'react-scroll-horizontal';

function FoodRecipe() {
  const videoCode = -11;
  const maxRecommended = 6;
  const [food, setFood] = useState([]);
  useEffect(() => {
    (async () => {
      // const FOOD_BY_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const FOOD_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52764';
      const response = await fetch(FOOD_BY_ID);
      const data = await response.json();
      const { meals } = data;
      setFood(meals);
      console.log('DATA', meals);
    })();
  }, []);
  console.log('FOOD', food);

  const [drink, setDrink] = useState([]);
  useEffect(() => {
    (async () => {
      const DRINK_RECOMMENDED = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(DRINK_RECOMMENDED);
      const data = await response.json();
      const { drinks } = data;
      setDrink(drinks);
    })();
  }, []);

  const [isFavorite, setIsFavorite] = useState(false);
  const [arrayFavorites, setArrayFavorites] = useState([]);
  setLocalStorage('favoriteRecipes', arrayFavorites);

  const includeFavorite = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = food[0];

    const FavoriteFood = [{
      id: idMeal,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholocOrNot: '',
      name: strMeal,
      image: strMealThumb,
    }];

    console.log('ARRAYFAVORITES', arrayFavorites);
    setArrayFavorites([...arrayFavorites, ...FavoriteFood]);
    setLocalStorage('favoriteRecipes', arrayFavorites);
    setIsFavorite(true);
  };

  const removeFavorite = () => {
    console.log('ARRAYFAVORITESREMOVE', arrayFavorites);
    const magicNumber = 52764;
    const newArrayFavorites = arrayFavorites
      .filter(({ id }) => id !== magicNumber);
    console.log('NEWARRAYFAVORITES', newArrayFavorites);
    setArrayFavorites(newArrayFavorites);
    setLocalStorage('favoriteRecipes', arrayFavorites);
    setIsFavorite(false);
  };

  return (
    <div>
      <p>oi</p>
      {
        food.map((item, index) => (
          <div key={ index }>
            <div>
              <img
                data-testid="recipe-photo"
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
            </div>
            <div>
              <h2 data-testid="recipe-title">{ item.strMeal }</h2>
              <p data-testid="recipe-category">{ item.strCategory }</p>
            </div>
            <div>
              <button data-testid="share-btn" type="button">
                <img src={ shareIcon } alt="Share Icon" />
              </button>
              <input
                type="image"
                data-testid="share-btn"
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
            <div>
              Video
              <iframe data-testid="video" title={ item.strMeal } src={ `https://www.youtube.com/embed/${(item.strYoutube).slice(videoCode)}` } />
            </div>
          </div>
        ))
      }
      <div>
        Recommended
        <div>
          {drink.map(({ strDrink, strDrinkThumb }, index2) => (
            index2 < maxRecommended
            && (
              <div data-testid={ `${index2}-recomendation-card` } key={ index2 }>
                <p>{ strDrink }</p>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
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

export default FoodRecipe;
