import React from 'react';
import { useDispatch } from 'react-redux';
import { dataIsFood } from '../../redux/reducers/dataReducer';

function DrinkInProgress() {
  const dispatch = useDispatch();
  dispatch(dataIsFood('drink'));
  return (
    <div>
      <h1>DrinkInProgress</h1>
    </div>
  );
}

export default DrinkInProgress;
