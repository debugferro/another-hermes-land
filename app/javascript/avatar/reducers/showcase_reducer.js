import { SHOW_ITEMS, SELECT_ITEM } from '../actions/index';

export function showcaseReducer(state = [], action) {
  switch (action.type) {
    case SHOW_ITEMS:
      return action.payload;
    default:
      return state;
  }
}

export function showcaseSelectedReducer(state = null, action) {
  switch (action.type) {
    case SELECT_ITEM:
      if (action.payload) { return action.payload; }
      else { return state; }
    default:
      return state;
  }
}
