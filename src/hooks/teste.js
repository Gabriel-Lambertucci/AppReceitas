import React, { useEffect, useState } from 'react';

import useFetch from '../hooks/useFetch';

const fetchEpisodes = async (episodesURLS) => {
  const episodesInPromises = episodesURLS.map(async (episodeURL) => {
    const response = await fetch(episodeURL);
    const { id, name, episode } = await response.json();
    return { id, name, episode };
  });
  const promisesFullfield = (await Promise.all(episodesInPromises));
  return promisesFullfield;
};

const CharacterDetail = ({ match: { params: { id } }}) => {
  const CHARACTER_BY_ID_ENDPOINT = `https://rickandmortyapi.com/api/character/${id}`;
  const { data: character } = useFetch(CHARACTER_BY_ID_ENDPOINT);

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (character) {
      fetchEpisodes(character.episode)
        .then((ep) => setEpisodes(ep));
    }
  }, [character]);

  const {name, status, image, species, origin} = character;

  return (
    <div style={ { display: "flex", flexDirection: "column", alignItems: "center"} }>
      <h2>Name: {name}</h2>
      <h3>Status: {status}</h3>
      <h3>specie: {species}</h3>
      <img style={ { width: "200px"}} src={image} alt={name} />
      <h3>Origin: {origin?.name}</h3>
      <h3>Episodes where {name} appears: </h3>
      <ul>
        {episodes.map((ep) =>
          (<li key={ep.id}>{`${ep.episode}: ${ep.name}`}</li>))}
      </ul>
    </div>
  );
};

export default CharacterDetail;




import React from 'react';
import { useHistory } from 'react-router-dom';

const CharCard = ({ name, status, species, gender, image, id }) => {
  let history = useHistory();
  return (
    <div>
      <img src={ image } alt={ name } onClick={ () => history.push(`/${id}`)}/>
      <p>{ `Name: ${name}` }</p>
      <p>{ `Status: ${status}` }</p>
      <p>{ `Species: ${species}` }</p>
      <p>{ `Gender: ${gender}` }</p>
    </div>
  );
}

export default CharCard;