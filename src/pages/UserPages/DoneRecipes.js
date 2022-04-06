import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ShareButton from '../../components/ShareButton';
import { donePageLocalStorage } from '../../helpers/localStorageHelper';

function DoneRecipes() {
  const [doneFilteredList, setFilteredList] = useState([]);

  const handleSearchInputChange = async ({ target: { value } }) => {
    if (value === 'all') {
      const doneList = donePageLocalStorage('doneRecipes');
      setFilteredList(doneList);
    } if (value === 'food' || value === 'drink') {
      const doneList = donePageLocalStorage('doneRecipes');
      const result = doneList
        .filter((obj) => obj.type === value);
      setFilteredList(result);
    }
  };

  useEffect(() => {
    const doneList = donePageLocalStorage('doneRecipes');
    setFilteredList(doneList);
  }, []);

  const aHref = (item) => (item.type !== 'food' ? `http://localhost:3000/drinks/${item.id}` : `http://localhost:3000/foods/${item.id}`);

  return (
    <div id="main">
      <Header value="Done Recipes" img="false" />
      <div>
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ (event) => handleSearchInputChange(event) }
        >
          All
        </button>
        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ (event) => handleSearchInputChange(event) }
        >
          Food
        </button>
        <button
          type="button"
          name="drink"
          value="drink"
          data-testid="filter-by-drink-btn"
          onClick={ (event) => handleSearchInputChange(event) }
        >
          Drinks
        </button>
      </div>
      {doneFilteredList ? doneFilteredList
        .map((item, index) => (
          <div key={ index }>
            <div>
              <a
                href={ aHref(item) }
              >
                <img
                  className="imgObj"
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt={ item.image }
                  href="https://www.google.com.br"
                />
              </a>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {item.alcoholicOrNot !== '' ? item.alcoholicOrNot
                  : `${item.nationality} - ${item.category}`}
              </p>
              <a
                href={ aHref(item) }
              >
                <h1
                  data-testid={ `${index}-horizontal-name` }
                >
                  { item.name }
                </h1>
              </a>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Done in: ${item.doneDate}`}

              </p>
              {item.tags.map((tag, ind) => (
                <div key={ ind }>
                  <p data-testid={ `${index}-${tag}-horizontal-tag` }>
                    {tag}
                  </p>
                </div>))}
            </div>
            <ShareButton
              datatest={ `${index}-horizontal-share-btn` }
              link={ item.type !== 'food' ? `/drinks/${item.id}`
                : `/foods/${item.id}` }
            />
          </div>
        )) : <h4>There is no Done Recipes!</h4>}
    </div>
  );
}
export default DoneRecipes;
