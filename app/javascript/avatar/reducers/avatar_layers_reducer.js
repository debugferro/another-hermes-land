import { INITIALIZE_CANVAS_LAYERS } from '../actions/init_canvas';
import { CHANGE_AV_INTEGRANT } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case INITIALIZE_CANVAS_LAYERS:
      return action.payload;
    case CHANGE_AV_INTEGRANT:
      state[action.payload.category].change(action.payload.asset);
      return state;
    default:
      return state;
  }
}

