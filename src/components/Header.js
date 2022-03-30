import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavHeader from './NavHeader';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../style/Header.css';

export default function Header(props) {
  const [click, setClick] = useState(false);
  const { value, img } = props;
  return (
    <header>
      <div className="header-content">
        {console.log(click)}
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
      {click === true ? <NavHeader /> : null}
    </header>
  );
}

Header.propTypes = {
  value: PropTypes.string.isRequired,
  img: PropTypes.bool.isRequired,
};
