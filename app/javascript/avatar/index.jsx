import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';
import thunk from 'redux-thunk';

import AvatarCanvas from './containers/avatar_canvas';
import avatarReducer from './reducers/avatar_reducer';

const container = document.querySelector('.container');

// const Hello = props => (
//   <div>Hello {props.name}!</div>
// )

// Hello.defaultProps = {
//   name: 'TESTE'
// }

// Hello.propTypes = {
//   name: PropTypes.string
// }

const initialState = {
  avatarElements: []
}

const reducers = combineReducers({
  avatarElements: avatarReducer
});

const middlewares = applyMiddleware(thunk);
const store = createStore(reducers, initialState, middlewares)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AvatarCanvas id={container.dataset.id} />
    </Provider>,
    container)
})
