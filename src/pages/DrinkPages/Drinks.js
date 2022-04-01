import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { dataFetchAPI, dataIsFood } from '../../redux/reducers/dataReducer';
import DrinksCard from '../../components/DrinksCard';
import CategoriesButtonsDrinks from '../../components/CategoriesButtonsDrinks';

const maxDrinks = 12;

function Drinks(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const { isFood, fetchAPI: { drinks } } = useSelector((state) => state.data);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((responseData) => dispatch(dataFetchAPI(responseData)));
  }, []);

  useEffect(() => {
    if (drinks !== undefined) {
      dispatch(dataIsFood(false));
    }
  }, [drinks]);

  return (
    <>
      <Header value="Drinks" img="true" />
      {console.log(drinks)}
      {isFood ? null : <CategoriesButtonsDrinks /> }
      {isFood ? <h2>Loading...</h2> : drinks.filter(
        (_item, index) => index < maxDrinks,
      )
        .map((item, index) => (
          <DrinksCard
            key={ index }
            name={ item.strDrink }
            src={ item.strDrinkThumb }
            index={ index }
            id={ item.idDrink }
            history={ history }
          />
        ))}
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Drinks;
