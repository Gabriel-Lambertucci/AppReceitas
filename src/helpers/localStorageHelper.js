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

export const setInProgressLocaStore = (key, id, initialValue) => {
  const item = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!item) {
    return localStorage.setItem('inProgressRecipes',
      JSON.stringify({ [key]: { [id]: [...initialValue] } }));
  } const prevState = JSON.parse(localStorage.getItem('inProgressRecipes'))[key];
  console.log(prevState);
  return localStorage.setItem('inProgressRecipes',
    JSON.stringify({ [key]: { ...prevState, [id]: [...initialValue] } }));
};

export const filterLocalStorage = (key, value) => {
  const item = JSON.parse(localStorage.getItem(key));
  if (item.some((element) => value === element.id)) {
    const newArray = item.filter((element) => element.id !== value);
    localStorage.setItem(key, JSON.stringify([...newArray]));
  }
};

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

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
