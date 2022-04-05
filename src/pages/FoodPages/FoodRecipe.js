import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteButton from '../../components/FavoriteButton';
import '../../style/FoodRecipe.css';
import ShareButton from '../../components/ShareButton';
import { getInProgressLocalStorage,
  getLocalStorage } from '../../helpers/localStorageHelper';

function FoodRecipe(props) {
  const { match: { params: { id } } } = props;
  const dispatch = useDispatch();
  const videoCode = -11;
  const maxRecommended = 6;
  const [food, setFood] = useState([]);
  const [isInLocalStorage, setIsInLocalStorage] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const FOOD_BY_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(FOOD_BY_ID)
      .then((response) => response.json())
      .then((data) => setFood(data.meals))
      .catch((error) => console.log(error));
    const objectMeals = getInProgressLocalStorage('meals');
    if (objectMeals) {
      const result = Object.keys(objectMeals).some((item) => item === id);
      setIsInLocalStorage(result);
    }
    const Done = getLocalStorage('doneRecipes');
    if (Done) {
      const isThere = Done.some((item) => item.id === id);
      if (isThere) {
        setIsDone(true);
      }
    }
  }, [id, dispatch]);

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

  return (
    <div>
      {
        food.map((item, index) => (
          <div key={ index }>
            <div>
              <img
                data-testid="recipe-photo"
                src={ item.strMealThumb }
                alt={ item.strMeal }
                style={ { width: '150px' } }
              />
            </div>
            <div>
              <h2 data-testid="recipe-title">{ item.strMeal }</h2>
              <p data-testid="recipe-category">{ item.strCategory }</p>
            </div>
            <div>
              <ShareButton datatest="share-btn" />
              <FavoriteButton
                localState={ { localId: id } }
                favProps={ {
                  favId: item.idMeal,
                  favType: 'food',
                  favNationality: item.strArea,
                  favCategory: item.strCategory,
                  favAlcoholicOrNot: '',
                  favName: item.strMeal,
                  favImage: item.strMealThumb } }
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
                <p data-testid={ `${index2}-recomendation-title` }>{ strDrink }</p>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
              </div>
            )
          ))}
        </div>
      </div>
      {console.log(isDone)}
      { isDone ? null : (
        <Link to={ `/foods/${id}/in-progress` }>
          <button
            className="startRecipeButton"
            data-testid="start-recipe-btn"
            type="button"
          >
            {isInLocalStorage ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </Link>
      )}
    </div>
  );
}

FoodRecipe.propTypes = {
  match: PropTypes.string.isRequired,
};

export default FoodRecipe;
