import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { dataFetchAPI, dataIsFood } from '../../redux/reducers/dataReducer';

function ExploreDrinksIngredients(props) {
  const dispatch = useDispatch();
  dispatch(dataIsFood(false));
  const { history } = props;

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

  const onClickHandler = async ({ target }) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${target.name}`;
    const response = await fetch(url);
    const data = await response.json();
    dispatch(dataFetchAPI(data));
    history.push('/drinks');
  };

  return (
    <div>
      <Header value="Explore Ingredients" img="false" />
      {
        ingredients.map((item, index) => (
          index < number
          && (
            <button type="button" onClick={ (e) => onClickHandler(e) }>
              <div
                key={ item.strIngredient1 }
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  name={ item.strIngredient1 }
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                  alt={ item.strIngredient }
                />
                <p
                  name={ item.strIngredient1 }
                  data-testid={ `${index}-card-name` }
                >
                  { item.strIngredient1 }
                </p>
              </div>
            </button>
          )
        ))
      }
      <Footer />
    </div>
  );
}

ExploreDrinksIngredients.propTypes = {
  history: PropTypes.func.isRequired,
};

export default ExploreDrinksIngredients;
