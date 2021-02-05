import { CHANGE_CATEGORY } from '../actions/index';

export default (state = '', action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
