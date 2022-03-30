import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/Header.css';
import NavBar from './NavBar';

export default function Header(props) {
  const [click, setClick] = useState(false);
  const { value, img } = props;
  return (
    <header>
      <div className="header-content">
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
        <h2 data-testid="page-title">{ value }</h2>
        {img === 'false' ? null : (
          <button onClick={ () => setClick(!click) } type="button">
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search"
            />
          </button>)}
      </div>
      {click === true ? <NavBar /> : null}
    </header>
  );
}

Header.propTypes = {
  value: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
