import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ datatest, link }) {
  const [copy, setCopy] = useState(false);

  const copyURL = () => {
    setCopy(true);
    const returnValue = (window.location.href).replace('/in-progress', ' ').trim();
    console.log(link);
    return navigator.clipboard.writeText((link !== undefined ? link : returnValue));
  };

  return (
    <button
      type="button"
      data-testid={ datatest }
      onClick={ copyURL }
      src={ shareIcon }
    >
      {!copy ? <img src={ shareIcon } alt="Share Icon" /> : 'Link copied!!'}
    </button>
  );
}

ShareButton.propTypes = {
  datatest: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ShareButton;
