import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { dataIsFood } from '../../redux/reducers/dataReducer';

function ExploreDrinksIngredients() {
  const dispatch = useDispatch();
  dispatch(dataIsFood(false));

  const number = 12;
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    (async () => {
      const INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(INGREDIENTS);
      const data = await response.json();
      const { drinks } = data;
      console.log('DRINKS', drinks);
      setIngredients(drinks);
    })();
  }, []);

  return (
    <div>
      <Header value="Explore Ingredients" img="false" />
      {
        ingredients.map((item, index) => (
          index < number
          && (
            <div
              key={ item.strIngredient1 }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                alt={ item.strIngredient1 }
              />
              <p data-testid={ `${index}-card-name` }>{ item.strIngredient1 }</p>
            </div>
          )
        ))
      }
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
