import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

let link = '';

function FetchHelper() {
  const globalStatefilter = useSelector((state) => state.filter);
  console.log(globalStatefilter);
  const [state, setState] = useState({ url: '' });

  useEffect(() => {
    console.log(state.url);
    if (globalStatefilter.searchByCategory === 'ingredients') {
      console.log('entrei');
      link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${globalStatefilter.searchByText}`;
    }
    if (globalStatefilter.searchByCategory === 'name') {
      link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${globalStatefilter.searchByText}`;
    }
    if (globalStatefilter.searchByCategory === 'first-letter') {
      link = `https://www.themealdb.com/api/json/v1/1/search.php?f=${globalStatefilter.searchByText}`;
    }
    setState(() => ({ url: link }));
  }, [globalStatefilter.searchByText, globalStatefilter.searchByCategory, state.url]);

  const apiFetch = async (paramURL) => {
    console.log(paramURL);
    const response = await fetch(paramURL);
    const data = await response.json();
    return data;
  };

  return (
    state.url ? apiFetch(state.url) : null
  );
}

export default FetchHelper;
