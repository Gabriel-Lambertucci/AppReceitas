export function fetchChangeFoods(byText, byButton) {
  if (byButton === 'ingredients') {
    return (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${byText}`);
  } if (byButton === 'name') {
    return (`https://www.themealdb.com/api/json/v1/1/search.php?s=${byText}`);
  } if (byButton === 'first-letter') {
    return (`https://www.themealdb.com/api/json/v1/1/search.php?f=${byText}`);
  }
}
export function fetchChangeDrinks(byText, byButton) {
  if (byButton === 'ingredients') {
    return (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${byText}`);
  } if (byButton === 'name') {
    return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${byText}`);
  } if (byButton === 'first-letter') {
    return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${byText}`);
  }
}
