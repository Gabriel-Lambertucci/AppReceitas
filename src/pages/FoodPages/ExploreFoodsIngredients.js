import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { dataFetchAPI } from '../../redux/reducers/dataReducer';

function ExploreFoodsIngredients(props) {
  const dispatch = useDispatch();
  const { history } = props;

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

  const onClickHandler = async ({ target }) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${target.name}`;
    const response = await fetch(url);
    const data = await response.json();
    dispatch(dataFetchAPI(data));
    history.push('/foods');
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
                key={ item.idIngredient }
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  name={ item.strIngredient }
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                  alt={ item.strIngredient }
                />
                <p
                  name={ item.strIngredient }
                  data-testid={ `${index}-card-name` }
                >
                  { item.strIngredient }
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

ExploreFoodsIngredients.propTypes = {
  history: PropTypes.func.isRequired,
};

export default ExploreFoodsIngredients;
