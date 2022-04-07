import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from '../pages/UserPages/Login';

import Foods from '../pages/FoodPages/Foods';
import FoodRecipe from '../pages/FoodPages/FoodRecipe';
import FoodInProgress from '../pages/FoodPages/FoodInProgress';

import Drinks from '../pages/DrinkPages/Drinks';
import DrinkRecipe from '../pages/DrinkPages/DrinkRecipe';
import DrinkInProgress from '../pages/DrinkPages/DrinkInProgress';

import Explore from '../pages/UserPages/Explore';
import ExploreFoods from '../pages/FoodPages/ExploreFoods';
import ExploreFoodsIngredients from '../pages/FoodPages/ExploreFoodsIngredients';
import ExploreFoodsNacionalities from '../pages/FoodPages/ExploreFoodsNacionalities';

import ExploreDrinks from '../pages/DrinkPages/ExploreDrinks';
import ExploreDrinksIngredients from '../pages/DrinkPages/ExploreDrinksIngredients';

import Profile from '../pages/UserPages/Profile';
import DoneRecipes from '../pages/UserPages/DoneRecipes';
import FavoriteRecipes from '../pages/UserPages/FavoriteRecipes';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />

        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ FoodRecipe } />
        <Route exact path="/foods/:id/in-progress" component={ FoodInProgress } />

        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ DrinkRecipe } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />

        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNacionalities }
        />

        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        <Route
          exact
          path="/explore/drinks/nationalities"
          component={ NotFound }
        />

        <Route exact path="/profile" component={ Profile } />

        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
