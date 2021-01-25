export const FETCH_PRESENT_AVATAR = "FETCH_PRESENT_AVATAR";
export const FETCH_ALL_AVATAR_ELEMENTS = "FETCH_ALL_AVATAR_ELEMENTS";

import thunk from 'redux-thunk';
import { initCanvas, INITIALIZE_CANVAS_LAYERS } from './init_canvas';

export const fetchAvatar = (id, canvas) => {
  const rootUrl = "./api/v1/avatars"
  return async function(dispatch, getState) {
    const response = await fetch(`${rootUrl}/${id}`);
    const data = await response.json();
    dispatch({type: FETCH_PRESENT_AVATAR, payload: data});
    dispatch({type: INITIALIZE_CANVAS_LAYERS, payload: initCanvas(data, canvas)})
  }
}

// export async function fetchAssetsData(gender) {
//   const BASE_URL = "./api/v1/assets";
//   const response = await fetch(`${BASE_URL}?gender=${gender}`);
//   const data = await response.json();
//   return data;
// }
