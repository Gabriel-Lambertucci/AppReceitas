import React from 'react';
import NavBar from './NavBar';

export default function NavHeader() {
  return (
    <div>
      <input type="text" placeholder="Search recipe" data-testid="search-input" />
      <NavBar />
    </div>
  );
}
