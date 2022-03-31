import PropTypes from 'prop-types';
import React, { useState } from 'react';

function ShareButton({ datatest }) {
  const [copy, setCopy] = useState(false);

  const copyURL = () => {
    urlValue = window.location.href;
    navigator.clipboard.writeText(urlValue);
    setCopy(true);
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
