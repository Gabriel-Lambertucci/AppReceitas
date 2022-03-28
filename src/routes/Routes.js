import React from 'react';
import { Route, Switch } from 'react-router-dom';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route exact path="/foods" component={ FoodsPage } />
      <Route exact path="/foods/:id" component={ X } />
      <Route exact path="/foods/:id/in-progress" component={ X } />

      <Route exact path="/drinks" component={ DrinksPage } />
      <Route exact path="/drinks/:id" component={ X } />
      <Route exact path="/drinks/:id/in-progress" component={ X } />

      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/foods/ingredients" component={ X } />
      <Route exact path="/explore/foods/nationalities" component={ X } />

      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/drinks/ingredients" component={ X } />

      <Route exact path="/profile" component={ Profile } />

      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>

  );
}

export default Routes;
