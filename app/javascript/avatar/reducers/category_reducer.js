import { CHANGE_CATEGORY } from '../actions/index';

export default function(state = '', action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}
