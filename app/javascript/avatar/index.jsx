import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

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
  avatarId: container.dataset.id
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider>

    </Provider>,
    container)
})
