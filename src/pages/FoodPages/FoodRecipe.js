import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import { dataFetchAPI } from '../../redux/reducers/dataReducer';
import FavoriteButton from '../../components/FavoriteButton';
// import HorizontalScroll from 'react-scroll-horizontal';

function FoodRecipe(props) {
  const { match: { params: { id } } } = props;
  const dispatch = useDispatch();
  const videoCode = -11;
  const maxRecommended = 6;
  const [food, setFood] = useState([]);

  useEffect(() => {
    const FOOD_BY_ID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(FOOD_BY_ID)
      .then((response) => response.json())
      .then((data) => {
        setFood(data.meals);
        dispatch(dataFetchAPI(data.meals));
      })
      .catch((error) => console.log(error));
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
      <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
    </div>
  );
}

FoodRecipe.propTypes = {
  match: PropTypes.string.isRequired,
};

export default FoodRecipe;
