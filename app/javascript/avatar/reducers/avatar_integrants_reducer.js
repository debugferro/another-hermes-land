import { FETCH_ALL_AVATAR_ELEMENTS } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ALL_AVATAR_ELEMENTS:
      return action.payload;
    default:
      return state;
  }
}
