import { FETCH_PRESENT_AVATAR } from '../actions/index';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_PRESENT_AVATAR:
      return action.payload;
    default:
      return state;
  }
};
