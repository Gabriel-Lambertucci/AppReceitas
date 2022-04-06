import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ShareButton from '../../components/ShareButton';
import { dataIsFood } from '../../redux/reducers/dataReducer';
// import { setLocalStorage } from '../../helpers/localStorageHelper';
import '../../style/FoodInProgress.css';
import FavoriteButton from '../../components/FavoriteButton';
import { setInProgressLocalStorageDrinks,
  getInProgressLocalStorage,
  setDoneRecipesLocalStorage } from '../../helpers/localStorageHelper';

function DrinkInProgress(props) {
  // Trocar 'meals' por 'drinks' na proxima página
  const { match: { params: { id } }, history } = props;
  const dispatch = useDispatch();
  dispatch(dataIsFood(false));
  const [drink, setDrink] = useState([]);
  const [isFinished, setIsFinished] = useState(true);
  const [riskItem, setRiskItem] = useState([]);

  useEffect(() => {
    const DRINKS_BY_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(DRINKS_BY_ID)
      .then((response) => response.json())
      .then((data) => {
        setDrink(data.drinks);
        dispatch(dataIsFood(true));
      })
      .catch((error) => console.log(error));
  }, [id, dispatch]);

  const recipeIngredients = (drink.length === 0 ? null : Object.entries(drink[0])
    .filter((item) => item[0].includes('strIngredient'))
    .filter((item) => item[1] !== '' && item[1] !== null)
    .map((item) => item[1])
  );

  const recipeMesures = (drink.length === 0 ? null : Object.entries(drink[0])
    .filter((item) => item[0].includes('strMeasure'))
    .filter((item) => item[1] !== '')
    .map((item) => item[1])
  );

  const recipeIngredientsAndMesures = (drink.length === 0 ? null : recipeIngredients
    .map((item, index) => `${recipeMesures[index]} - ${item}`));

  useEffect(() => {
    const drinksObject = getInProgressLocalStorage('cocktails');
    if (drinksObject) {
      const ingredientsArray = drinksObject[id];
      setRiskItem(ingredientsArray);
    }
  }, [id]);

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
    setRiskItem(filterLocalStorage);
    setInProgressLocalStorageDrinks(id, filterLocalStorage);
  };

  const handleFinishedRecipe = () => {
    const favProps = {
      id: drink[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drink[0].strCategory,
      alcoholicOrNot: drink[0].strAlcoholic,
      name: drink[0].strDrink,
      image: drink[0].strDrinkThumb };
    setDoneRecipesLocalStorage(favProps);
    history.push('/done-recipes');
  };

  return (
    <div>
      {drink.length === 0
        ? <h2>Loading...</h2>
        : (
          <>
            <img
              src={ drink[0].strDrinkThumb }
              alt={ `Recipe for ${drink[0].strDrink}` }
              data-testid="recipe-photo"
            />
            <h1
              data-testid="recipe-title"
            >
              { drink[0].strDrink }
            </h1>
            <ShareButton datatest="share-btn" />
            <FavoriteButton
              localState={ { localId: id } }
              favProps={ {
                favId: drink[0].idDrink,
                favType: 'drink',
                favNationality: '',
                favCategory: drink[0].strCategory,
                favAlcoholicOrNot: drink[0].strAlcoholic,
                favName: drink[0].strDrink,
                favImage: drink[0].strDrinkThumb } }
            />
            <p
              data-testid="recipe-category"
            >
              { `A ${drink[0].strAlcoholic} Recipe:` }
            </p>
            <ul>
              {recipeIngredientsAndMesures
                .map((item, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      checked={ riskItem && riskItem.some((element) => (
                        index === parseInt(element, 10)
                      )) }
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
              { drink[0].strInstructions }
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

DrinkInProgress.propTypes = {
  match: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};

export default DrinkInProgress;
