import React from 'react';
import PropTypes from 'prop-types';
import { setLocalStorageId } from '../helpers/localStorageHelper';

export default function FoodsCard(props) {
  const { name, src, index, id, history } = props;

  const handleButtonClick = () => {
    setLocalStorageId('idFood', id);
    history.push(`/foods/${id}`);
  };

  return (
    <button type="button" onClick={ handleButtonClick }>
      <div data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{name}</p>
        <img
          data-testid={ `${index}-card-img` }
          src={ src }
          alt="food img"
          style={ { width: 100 } }
        />
      </div>
    </button>
  );
}

FoodsCard.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};
