import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/app';
import avatarReducer from './reducers/avatar_reducer';
import avatarLayersReducer from './reducers/avatar_layers_reducer';
import categoryReducer from './reducers/category_reducer';
import avatarIntegrantsReducer from './reducers/avatar_integrants_reducer';
import { showcaseReducer, showcaseSelectedReducer } from './reducers/showcase_reducer';

const container = document.querySelector('.container');

const initialState = {
  selectedCategory: ''
};

const reducers = combineReducers({
  avatar: avatarReducer,
  avatarLayers: avatarLayersReducer,
  integrants: avatarIntegrantsReducer,
  selectedCategory: categoryReducer,
  showcaseItems: showcaseReducer,
  showcaseSelected: showcaseSelectedReducer
});

const middlewares = applyMiddleware(thunk);
const store = createStore(reducers, initialState, middlewares)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App avatarId={container.dataset.id} token={container.dataset.token} />
    </Provider>,
    container);
});
