import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      style={ { position: 'absolute', bottom: 0, right: 0 } }
      data-testid="footer"
    >
      <Link to="/drinks">
        <button type="button">
          <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explore">
        <button type="button">
          <img src={ exploreIcon } alt="Drink Icon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/foods">
        <button type="button">
          <img src={ mealIcon } alt="Drink Icon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
