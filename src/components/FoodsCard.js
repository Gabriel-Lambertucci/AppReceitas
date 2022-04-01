import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FoodsCard(props) {
  const { name, src, index, id } = props;
  return (
    <Link to={ `/foods/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{name}</p>
        <img
          data-testid={ `${index}-card-img` }
          src={ src }
          alt="food img"
          style={ { width: 100 } }
        />
      </div>
    </Link>
  );
}

FoodsCard.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
