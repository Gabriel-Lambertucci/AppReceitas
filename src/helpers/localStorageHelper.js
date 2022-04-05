export const setLocalStorage = (key, initialValue) => {
  const item = JSON.parse(localStorage.getItem(key));
  if (item && (!item.some((element) => initialValue.name === element.name))) {
    localStorage.setItem(key, JSON.stringify([...item, initialValue]));
  }
  if (!item) {
    localStorage.setItem(key, JSON.stringify([initialValue]));
  }
};

export const filterLocalStorage = (key, value) => {
  console.log(value);
  const item = JSON.parse(localStorage.getItem(key));
  console.log(item[0].id);
  if (item.some((element) => value === element.id)) {
    console.log('entrei');
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
