import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import { dataFetchAPI } from '../../redux/reducers/dataReducer';
import FavoriteButton from '../../components/FavoriteButton';

function DrinkRecipe(props) {
  const dispatch = useDispatch();
  const videoCode = -11;
  const maxRecommended = 6;
  const { match: { params: { id } } } = props;
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    const DRINK_BY_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(DRINK_BY_ID)
      .then((response) => response.json())
      .then((data) => {
        setDrink(data.drinks);
        dispatch(dataFetchAPI(data.drinks));
      })
      .catch((error) => console.log(error));
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
              <button data-testid="share-btn" type="button">
                <img src={ shareIcon } alt="Share Icon" />
              </button>
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
        <div>
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
