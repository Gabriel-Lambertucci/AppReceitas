import React from 'react';
import { useDispatch } from 'react-redux';
import { dataIsFood } from '../../redux/reducers/dataReducer';

function DrinkRecipe() {
  const dispatch = useDispatch();
  dispatch(dataIsFood(false));
  return (
    <div>
      <h1>DrinkRecipe</h1>
    </div>
  );
}

export default DrinkRecipe;
