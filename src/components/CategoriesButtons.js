/* import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataFetchAPI, dataIsFood } from '../redux/reducers/dataReducer';

const maxCategories = 5;
const maxMeals = 12;

export default function CategoriesButtons() {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState([]);
  const [permission, setPermission] = useState(false);
  const [state, setCategories] = useState(undefined);
  const { isFood } = useSelector((globalState) => globalState.data);

  useEffect(() => {
    if (isFood) {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((data) => setCategories(data));
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }
  }, [isFood]);

  useEffect(() => {
    if (state && isFood && !permission) {
      const mealsArray = state.meals.filter(
        (__item, index) => index < maxCategories,
      );
      setCategories(mealsArray);
      setPermission(true);
    }
    if (state && !isFood && !permission) {
      const drinksArray = state.drinks.filter(
        (__item, index) => index < maxCategories,
      );
      setCategories(drinksArray);
      setPermission(true);
    }
  }, [state]);

  const auxMealFunction = (name) => {
    if (clicked.includes(name)) {
      console.log('aqui', clicked);
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((responseData) => dispatch(dataFetchAPI(responseData)));
      setClicked([clicked.filter((item) => item !== name)]);
      return null;
    }
    setClicked([name]);
    dispatch(dataIsFood(isFood));
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
      .then((response) => response.json())
      .then((categorieResponse) => (
        dispatch(dataFetchAPI(
          { meals: categorieResponse.meals.filter((__item, index) => {
            const result = index < maxMeals;
            return result;
          }) },
        ))));
  };

  const auxDrinkFunction = (name) => {
    if (clicked.includes(name)) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((responseData) => dispatch(dataFetchAPI(responseData)));
      setClicked([clicked.filter((item) => item !== name)]);
      return null;
    }
    setClicked([name]);
    dispatch(dataIsFood(isFood));
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`)
      .then((response) => response.json())
      .then((categorieResponse) => (
        dispatch(dataFetchAPI(
          { drinks: categorieResponse.drinks.filter((__item, index) => {
            const result = index < maxMeals;
            return result;
          }) },
        ))));
  };

  const handleFilterClick = ({ target: { name } }) => {
    if (isFood) {
      auxMealFunction(name);
      return null;
    }
    auxDrinkFunction(name);
  };

  return (
    <div>
      {permission ? (
        state.filter((__item, index) => index < maxCategories)
          .map((item, index) => (
            <button
              name={ item.strCategory }
              data-testid={ `${item.strCategory}-category-filter` }
              key={ index }
              type="button"
              onClick={ (e) => handleFilterClick(e) }
            >
              {item.strCategory}
            </button>)))
        : null }
    </div>
  );
}
 */
