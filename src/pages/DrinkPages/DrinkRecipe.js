import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataIsFood } from '../../redux/reducers/dataReducer';

function DrinkRecipe() {
  const dispatch = useDispatch();
  dispatch(dataIsFood(false));

  const maxRecommended = 6;

  const [drink, setDrink] = useState([]);
  useEffect(() => {
    (async () => {
      // const DRINK_BY_ID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const DRINK_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12910';
      const response = await fetch(DRINK_BY_ID);
      const data = await response.json();
      const { drinks } = data;
      setDrink(drinks);
    })();
  }, []);

  const [food, setFood] = useState([]);
  useEffect(() => {
    (async () => {
      const FOOD__RECOMMENDED = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(FOOD__RECOMMENDED);
      const data = await response.json();
      const { meals } = data;
      setFood(meals);
      console.log('DATA', meals);
    })();
  }, []);

  return (
    <div>
      <p>oi</p>
      {
        drink.map((item, index) => (
          <div key={ index }>
            <div>
              <img
                data-testid="recipe-photo"
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
              />
            </div>
            <div>
              <h2 data-testid="recipe-title">{ item.strDrink }</h2>
              <p data-testid="recipe-category">{ item.strCategory }</p>
            </div>
            <div>
              <button data-testid="share-btn" type="button">Share</button>
              <button data-testid="favorite-btn" type="button">Favorite</button>
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
                <p>{ strMeal }</p>
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

export default DrinkRecipe;
