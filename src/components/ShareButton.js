import PropTypes from 'prop-types';
import React, { useState } from 'react';

function ShareButton({ datatest }) {
  const [copy, setCopy] = useState(false);

  const copyURL = () => {
    setCopy(true);
    const returnValue = (window.location.href).replace('/in-progress', ' ').trim();
    return navigator.clipboard.writeText(returnValue);
  };

  return (
    <button
      type="button"
      data-testid={ datatest }
      onClick={ copyURL }
    >
      {!copy ? 'Share link' : 'Link copied!!'}
    </button>
  );
}

ShareButton.propTypes = {
  datatest: PropTypes.string.isRequired,
};

export default ShareButton;
