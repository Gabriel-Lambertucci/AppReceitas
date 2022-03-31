import React from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { dataIsFood } from '../../redux/reducers/dataReducer';

function Drinks() {
  const dispatch = useDispatch();
  dispatch(dataIsFood(false));
  return (
    <div>
      <Header value="Drinks" img="true" />
      <h1>Drinks</h1>
      <Footer />
    </div>
  );
}

export default Drinks;
