import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreFoods() {
  return (
    <div>
      <Header value="Explore Foods" img="false" />
      <Link to="/explore/foods/ingredients">
        <button data-testid="explore-by-ingredient" type="button">By Ingredient</button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button data-testid="explore-by-nationality" type="button">By Nationality</button>
      </Link>
      <Link to="/foods/52771">
        <button data-testid="explore-surprise" type="button">Surprise me!</button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
