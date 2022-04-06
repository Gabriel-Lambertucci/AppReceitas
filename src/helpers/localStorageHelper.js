export const setUserLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const setDoneRecipesLocalStorage = (value) => {
  const item = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!item) {
    localStorage.setItem('doneRecipes', JSON.stringify([value]));
  } else {
    const prevState = JSON.parse(localStorage.getItem('doneRecipes'));
    localStorage.setItem('doneRecipes', JSON.stringify([...prevState, value]));
  }
};

export const setLocalStorage = (key, initialValue) => {
  const item = JSON.parse(localStorage.getItem(key));
  if (item && (!item.some((element) => initialValue.name === element.name))) {
    localStorage.setItem(key, JSON.stringify([...item, initialValue]));
  }
  if (!item && key === 'favoriteRecipes') {
    localStorage.setItem(key, JSON.stringify([initialValue]));
  } if (!item && key === 'user') {
    localStorage.setItem(key, JSON.stringify(initialValue));
  }
};

export const setInProgressLocalStorageMeals = (id, initialValue) => {
  const item = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!item) {
    return localStorage.setItem('inProgressRecipes',
      JSON.stringify({ meals: { [id]: [...initialValue] } }));
  } const prevStateFoods = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
  const prevStateDrinks = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;
  return localStorage.setItem('inProgressRecipes',
    JSON.stringify(
      {
        cocktails: { ...prevStateDrinks },
        meals: { ...prevStateFoods, [id]: [...initialValue] },
      },
    ));
};

export const setInProgressLocalStorageDrinks = (id, initialValue) => {
  const item = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!item) {
    return localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: { [id]: [...initialValue] } }));
  }
  const prevStateDrinks = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;
  const prevStateFoods = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
  return localStorage.setItem('inProgressRecipes',
    JSON.stringify(
      {
        meals: { ...prevStateFoods },
        cocktails: { ...prevStateDrinks, [id]: [...initialValue] },
      },
    ));
};

export const filterLocalStorage = (key, value) => {
  const item = JSON.parse(localStorage.getItem(key));
  if (item.some((element) => value === element.id)) {
    const newArray = item.filter((element) => element.id !== value);
    localStorage.setItem(key, JSON.stringify([...newArray]));
  }
};

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export const getInProgressLocalStorage = (key) => {
  const object = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (object) {
    return object[key];
  }
  return null;
};

export const removeKeyLocalStorage = (key) => localStorage.removeItem(key);

export const clearLocalStorage = () => localStorage.clear();

export const setLocalStorageId = (key, value) => {
  const item = JSON.parse(localStorage.getItem(key));
  if (item) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  if (!item) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getSavedValue = (key) => {
  const savedValue = JSON.parse(localStorage.getItem(key));
  return savedValue;
};
export const favoritesPageLocalStorage = (key) => getSavedValue(key);

export const donePageLocalStorage = (key) => getSavedValue(key);
