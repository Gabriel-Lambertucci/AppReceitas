import React from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { dataIsFood } from '../../redux/reducers/dataReducer';

function ExploreDrinksIngredients() {
  const dispatch = useDispatch();
  dispatch(dataIsFood(false));
  return (
    <div>
      <Header value="Explore Ingredients" img="false" />
      <h1>ExploreDrinksIngredients</h1>
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
