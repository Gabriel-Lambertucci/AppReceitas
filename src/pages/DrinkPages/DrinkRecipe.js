import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteButton from '../../components/FavoriteButton';
import '../../style/DrinkRecipe.css';
import { getInProgressLocalStorage,
  getLocalStorage } from '../../helpers/localStorageHelper';
import ShareButton from '../../components/ShareButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function DrinkRecipe(props) {
  const dispatch = useDispatch();
  const videoCode = -11;
  const maxRecommended = 6;
  const { match: { params: { id } } } = props;
  const [drink, setDrink] = useState([]);
  const [isInLocalStorage, setIsInLocalStorage] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const DRINK_BY_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(DRINK_BY_ID)
      .then((response) => response.json())
      .then((data) => setDrink(data.drinks))
      .catch((error) => console.log(error));
    const objectDrinks = getInProgressLocalStorage('cocktails');
    if (objectDrinks) {
      const result = Object.keys(objectDrinks).some((item) => item === id);
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

  return (
    <div>
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
              <ShareButton datatest="share-btn" />
              <FavoriteButton
                localState={ { localId: id } }
                favProps={ {
                  favId: item.idDrink,
                  favType: 'drink',
                  favNationality: '',
                  favCategory: item.strCategory,
                  favAlcoholicOrNot: item.strAlcoholic,
                  favName: item.strDrink,
                  favImage: item.strDrinkThumb } }
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
        <div className="carousel">
          {food.map(({ strMeal, strMealThumb }, index2) => (
            index2 < maxRecommended
            && (
              <div
                className={ `items-div card${index2}-recomendation` }
                data-testid={ `${index2}-recomendation-card` }
                key={ index2 }
              >
                <p data-testid={ `${index2}-recomendation-title` }>{ strMeal }</p>
                <img
                  className="item-img"
                  src={ strMealThumb }
                  alt={ strMeal }
                />
              </div>
            )
          ))}
        </div>
      </div>
      {isDone ? null : (
        <Link to={ `/drinks/${id}/in-progress` }>
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="startRecipeButton"
          >
            {isInLocalStorage ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </Link>)}
    </div>
  );
}

DrinkRecipe.propTypes = {
  match: PropTypes.string.isRequired,
};

export default DrinkRecipe;
