import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { clearLocalStorage, getLocalStorage } from '../../helpers/localStorageHelper';

function Profile() {
  const user = getLocalStorage('user');

  const handleClick = () => {
    clearLocalStorage();
  };

  return (
    <div>
      <Header value="Profile" img="false" />
      <h4 data-testid="profile-email">
        email:
        {' '}
        {user ? user.email : null}
      </h4>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
      </Link>
      <Link to="/">
        <button
          onClick={ handleClick }
          data-testid="profile-logout-btn"
          type="button"
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
