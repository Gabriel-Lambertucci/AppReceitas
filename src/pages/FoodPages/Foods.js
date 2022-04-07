import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { dataFetchAPI, dataIsFood } from '../../redux/reducers/dataReducer';
import FoodsCard from '../../components/FoodsCard';
/* import CategoriesButtons from '../../components/CategoriesButtons'; */
import CategoriesButtonsMeals from '../../components/CategoriesButtonsMeals';

const maxMeals = 12;

function Foods(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const { isFood, fetchAPI: { meals } } = useSelector((state) => state.data);
  useEffect(() => {
    if (!meals) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((responseData) => dispatch(dataFetchAPI(responseData)));
      dispatch(dataIsFood(true));
    }
  }, [dispatch]);

  return (
    <>
      <Header value="Foods" img="true" />
      <CategoriesButtonsMeals />
      {isFood && meals ? meals.filter(
        (__item, index) => index < maxMeals,
      )
        .map((item, index) => (
          <FoodsCard
            key={ index }
            name={ item.strMeal }
            src={ item.strMealThumb }
            index={ index }
            id={ item.idMeal }
            history={ history }
          />
        )) : <h2>Loading...</h2>}
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Foods;
