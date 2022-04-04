import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreFoodsIngredients() {
  const number = 12;
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    (async () => {
      const INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(INGREDIENTS);
      const data = await response.json();
      const { meals } = data;
      console.log('MEALS', meals);
      setIngredients(meals);
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
              key={ item.idIngredient }
              data-testid={ `${index}-ingredient-card` }
            >
              <img data-testid={ `${index}-card-img` } src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` } alt={ item.strIngredient } />
              <p data-testid={ `${index}-card-name` }>{ item.strIngredient }</p>
            </div>
          )
        ))
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
