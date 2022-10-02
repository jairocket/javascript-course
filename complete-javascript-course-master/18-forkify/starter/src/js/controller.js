import 'core-js/stable'; //polyfilling ES6 methods
import 'regenerator-runtime/runtime'; //polyfilling async/await

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
console.log('test');

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSppiner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSppiner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
