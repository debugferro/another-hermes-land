import { FETCH_PRESENT_AVATAR, FETCH_ALL_AVATAR_ELEMENTS } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PRESENT_AVATAR:
      return action.payload;
    case FETCH_ALL_AVATAR_ELEMENTS:
      return action.payload;
    default:
      return state;
  }
}
