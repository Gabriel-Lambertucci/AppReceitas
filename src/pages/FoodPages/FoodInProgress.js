import React from 'react';
import { useSelector } from 'react-redux';

function FoodInProgress() {
  // Trocar 'meals' por 'drinks' na proxima página
  const APIdata = useSelector((state) => state.data.fetchAPI.meals[0]);
  const recipeIngredients = APIdata
    .map((item) => Object.keys(item).match('Ingredient'));
  console.log(recipeIngredients);
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = APIdata;

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ `Recipe for ${strMeal}` }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { strMeal }
      </h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <p
        data-testid="recipe-category"
      >
        { `Recipe with ${strCategory}` }
      </p>
      <ul>
        {recipeIngredients.map((item, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
            />
            { item }
          </li>
        ))}
      </ul>
      <p
        data-testid="instructions"
      >
        { strInstructions }
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Favorite
      </button>
    </div>
  );
}

export default FoodInProgress;
