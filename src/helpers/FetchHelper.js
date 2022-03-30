import { useState } from 'react';
import { useSelector } from 'react-redux';
// import useFetch from '../hooks/useFetch';

function FetchHelper() {
  const globalStatefilter = useSelector((state) => state.filter);
  console.log(globalStatefilter);
  // const dispatch = useDispatch();
  const [url, setUrl] = useState('');

  let link;
  if (globalStatefilter.searchByCategory === 'ingredient') {
    link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${globalStatefilter.searchByText}`;
    return setUrl(link);
  }
  if (globalStatefilter.searchByCategory === 'name') {
    link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${globalStatefilter.searchByText}`;
    return setUrl(link);
  }
  if (globalStatefilter.searchByCategory === 'first-letter') {
    link = `https://www.themealdb.com/api/json/v1/1/search.php?f=${globalStatefilter.searchByText}`;
    return setUrl(link);
  }

  return console.log(url);
}

export default FetchHelper;

// function FetchHelper() {
//   const globalStatefilter = useSelector((state) => state.filter);
//   console.log(globalStatefilter);
//   // const dispatch = useDispatch();
//   const [url, setUrl] = UseState('');

//   let link;

//   function teste() {
//     if (globalStatefilter.searchByCategory === 'ingredient') {
//       link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${globalStatefilter.searchByText}`;
//       setUrl(link);
//     }
//     if (globalStatefilter.searchByCategory === 'name') {
//       link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${globalStatefilter.searchByText}`;
//       setUrl(link);
//     }
//     if (globalStatefilter.searchByCategory === 'first-letter') {
//       link = `https://www.themealdb.com/api/json/v1/1/search.php?f=${globalStatefilter.searchByText}`;
//       setUrl(link);
//     }
//   }

//   const apiFetch = async (paramURL) => {
//     teste();
//     const response = await fetch(paramURL);
//     const data = await response.json();
//     console.log(data);
//   };

//   return (
//     url ? apiFetch(ur) : null
//   );
// }

// export default FetchHelper;
