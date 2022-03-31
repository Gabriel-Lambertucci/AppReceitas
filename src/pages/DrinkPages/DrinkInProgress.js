import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ShareButton from '../../components/ShareButton';
import { dataIsFood } from '../../redux/reducers/dataReducer';

function DrinkInProgress() {
  const dispatch = useDispatch();
  dispatch(dataIsFood(false));
  const { history } = useHistory();
  const APIdata = useSelector((state) => state.data.fetchAPI.drinks[0]);

  const recipeIngredients = APIdata
    .map((item) => Object.keys(item).match('Ingredient'));

  const {
    idDrink,
    strDrinkThumb,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = APIdata;

  const toLocalStorage = { cocktails: { [idDrink]: [...recipeIngredients] } };

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
        src={ strDrinkThumb }
        alt={ `Recipe for ${strDrink}` }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { strDrink }
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
        { `${strCategory} (${strAlcoholic})` }
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

export default DrinkInProgress;
