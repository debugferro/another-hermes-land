import { INITIALIZE_CANVAS_LAYERS } from '../actions/init_canvas';

export default function(state = null, action) {
  switch (action.type) {
    case INITIALIZE_CANVAS_LAYERS:
      return action.payload;
    default:
      return state;
  }
}

