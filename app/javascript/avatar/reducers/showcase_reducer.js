import { SHOW_ITEMS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case SHOW_ITEMS:
      return action.payload;
    default:
      return state;
  }
}
