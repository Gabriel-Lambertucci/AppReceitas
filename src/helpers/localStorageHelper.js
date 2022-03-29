export const setLocalStorage = (key, initialValue) => (
  localStorage.setItem(key, JSON.stringify(initialValue))
);

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
