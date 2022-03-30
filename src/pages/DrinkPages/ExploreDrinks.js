import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreDrinks() {
  return (
    <div>
      <Header value="Explore Drinks" img="false" />
      <Link to="/explore/drinks/ingredients">
        <button data-testid="explore-by-ingredient" type="button">By Ingredient</button>
      </Link>
      <Link to="/drinks/178319">
        <button data-testid="explore-surprise" type="button">Surprise me!</button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
