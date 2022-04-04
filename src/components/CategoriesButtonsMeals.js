import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataFetchAPI, dataIsFood } from '../redux/reducers/dataReducer';

const maxCategories = 5;
const maxMeals = 12;

export default function CategoriesButtonsMeals() {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState([]);
  const [permission, setPermission] = useState(false);
  const [state, setCategories] = useState(undefined);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (state && !permission) {
      const mealsArray = state.meals.filter(
        (__item, index) => index < maxCategories,
      );
      setCategories(mealsArray);
      setPermission(true);
    }
  }, [state, permission]);

  const auxMealFunction = (name) => {
    if (clicked.includes(name)) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((responseData) => dispatch(dataFetchAPI(responseData)));
      setClicked([clicked.filter((item) => item !== name)]);
      return null;
    }
    setClicked([name]);
    dispatch(dataIsFood(true));
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

  const handleFilterClick = ({ target: { name } }) => {
    if (name === 'all') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((responseData) => dispatch(dataFetchAPI(responseData)));
      return null;
    }
    auxMealFunction(name);
  };

  return (
    <div>
      {permission ? (
        <button
          name="all"
          data-testid="All-category-filter"
          type="button"
          onClick={ (e) => handleFilterClick(e) }
        >
          All
        </button>)
        : null}
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
