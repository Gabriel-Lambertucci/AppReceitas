import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ShareButton from '../../components/ShareButton';
import { dataIsFood } from '../../redux/reducers/dataReducer';
// import { setLocalStorage } from '../../helpers/localStorageHelper';
import '../../style/FoodInProgress.css';
import FavoriteButton from '../../components/FavoriteButton';
import { setInProgressLocaStore } from '../../helpers/localStorageHelper';

function FoodInProgress(props) {
  // Trocar 'meals' por 'drinks' na proxima página
  const { match: { params: { id } }, history } = props;
  const dispatch = useDispatch();
  const [food, setFood] = useState([]);
  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    const FOOD_BY_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(FOOD_BY_ID)
      .then((response) => response.json())
      .then((data) => {
        setFood(data.meals);
        dispatch(dataIsFood(true));
      })
      .catch((error) => console.log(error));
  }, [id, dispatch]);

  const recipeIngredients = (food.length === 0 ? null : Object.entries(food[0])
    .filter((item) => item[0].includes('strIngredient'))
    .filter((item) => item[1] !== '' && item[1] !== null)
    .map((item) => item[1])
  );

  const recipeMesures = (food.length === 0 ? null : Object.entries(food[0])
    .filter((item) => item[0].includes('strMeasure'))
    .filter((item) => item[1] !== '')
    .map((item) => item[1])
  );

  const recipeIngredientsAndMesures = (food.length === 0 ? null : recipeIngredients
    .map((item, index) => `${recipeMesures[index]} - ${item}`));

  const onCheckboxChange = () => {
    const checkedList = Array.from(document.querySelectorAll('.ingredients_checkbox'));
    const everyChecked = checkedList.every((item) => item.checked);
    return (everyChecked ? setIsFinished(false) : setIsFinished(true));
  };

  const localStorageInProgress = () => {
    const checkedList = Array.from(document.querySelectorAll('.ingredients_checkbox'));
    const filterLocalStorage = checkedList
      .map((item) => (item.checked && item.name))
      .filter((item) => item !== false);
    console.log(filterLocalStorage);
    setInProgressLocaStore('meals', id, filterLocalStorage);
  };

  const handleFinishedRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      {food.length === 0
        ? <h2>Loading...</h2>
        : (
          <>
            <img
              src={ food[0].strMealThumb }
              alt={ `Recipe for ${food[0].strMeal}` }
              data-testid="recipe-photo"
            />
            <h1
              data-testid="recipe-title"
            >
              { food[0].strMeal }
            </h1>
            <ShareButton datatest="share-btn" />
            <FavoriteButton
              localState={ { localId: id } }
              favProps={ {
                favId: food[0].idMeal,
                favType: 'food',
                favNationality: food[0].strArea,
                favCategory: food[0].strCategory,
                favAlcoholicOrNot: '',
                favName: food[0].strMeal,
                favImage: food[0].strMealThumb } }
            />
            <p
              data-testid="recipe-category"
            >
              { `A ${food[0].strCategory} Recipe:` }
            </p>
            <ul>
              {recipeIngredientsAndMesures
                .map((item, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      name={ index }
                      className="ingredients_checkbox"
                      type="checkbox"
                      onClick={ () => {
                        onCheckboxChange();
                        localStorageInProgress();
                      } }
                    />
                    <span className="ingredients_list">{ item }</span>
                  </li>
                ))}
            </ul>
            <p
              data-testid="instructions"
            >
              { food[0].strInstructions }
            </p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isFinished }
              onClick={ () => handleFinishedRecipe() }
            >
              Finish!
            </button>
          </>
        )}
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};

export default FoodInProgress;
