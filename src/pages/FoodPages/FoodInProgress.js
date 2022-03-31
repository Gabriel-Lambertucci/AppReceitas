import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ShareButton from '../../components/ShareButton';
import { setLocalStorage } from '../../helpers/localStorageHelper';

function FoodInProgress() {
  // Trocar 'meals' por 'drinks' na proxima página
  const { history } = useHistory();
  const APIdata = useSelector((state) => state.data.fetchAPI.meals[0]);

  const recipeIngredients = APIdata
    .map((item) => Object.keys(item).match('Ingredient'));

  const {
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = APIdata;

  const toLocalStorage = { meals: { [idMeal]: [...recipeIngredients] } };

  useEffect(() => {
    setLocalStorage('inProgressRecipes', toLocalStorage);
  });

  const handleFinishedRecipe = () => {
    history.push('/done-recipes');
  };

  console.log(recipeIngredients);

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
      <ShareButton datatest="share-btn" />
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
        onClick={ () => handleFinishedRecipe() }
      >
        Finish!
      </button>
    </div>
  );
}

export default FoodInProgress;
