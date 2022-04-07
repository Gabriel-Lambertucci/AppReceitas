import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FoodsCard from '../../components/FoodsCard';

function ExploreFoodsNacionalities(props) {
  const [nacionalities, setNacionalities] = useState([{ strArea: 'All' }]);
  const [foods, setFoods] = useState([]);
  const { history } = props;
  const max = 12;

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((data) => setNacionalities([...nacionalities, ...data.meals]));
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setFoods(data.meals));
  }, []);

  const onChangeHandler = ({ target }) => {
    console.log(target.value);
    if (target.value !== 'All') {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`)
        .then((response) => response.json())
        .then((data) => setFoods(data.meals));
    } else {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setFoods(data.meals));
    }
  };

  return (
    <div>
      {console.log(nacionalities)}
      <Header value="Explore Nationalities" img="true" />
      <label htmlFor="dropdown">
        <select
          onChange={ (e) => onChangeHandler(e) }
          id="dropdown"
          data-testid="explore-by-nationality-dropdown"
        >
          {nacionalities && nacionalities.map((item, index) => (
            <option
              data-testid={ `${item.strArea}-option` }
              key={ index }
            >
              {item.strArea}
            </option>))}
        </select>
        {foods.map((item, index) => (
          index < max && (
            <FoodsCard
              key={ index }
              name={ item.strMeal }
              src={ item.strMealThumb }
              index={ index }
              id={ item.idMeal }
              history={ history }
            />
          )))}
      </label>
      <Footer />
    </div>
  );
}

ExploreFoodsNacionalities.propTypes = {
  history: PropTypes.func.isRequired,
};

export default ExploreFoodsNacionalities;
