export const FETCH_PRESENT_AVATAR = "FETCH_PRESENT_AVATAR";
export const FETCH_ALL_AVATAR_ELEMENTS = "FETCH_ALL_AVATAR_ELEMENTS";
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";
export const SHOW_ITEMS = "SHOW_ITEMS";
export const CHANGE_AV_INTEGRANT = "CHANGE_AV_INTEGRANT";
export const SELECT_ITEM = "SELECT_ITEM";

import thunk from 'redux-thunk';
import { initCanvas, INITIALIZE_CANVAS_LAYERS } from './init_canvas';

export const initializeCanvas = (id, canvas) => {
  const avatarsUrl = "./api/v1/avatars"
  return async function(dispatch, getState) {
    const avResponse = await fetch(`${avatarsUrl}/${id}`);
    const avData = await avResponse.json();
    dispatch({type: FETCH_PRESENT_AVATAR, payload: avData});
    dispatch({type: INITIALIZE_CANVAS_LAYERS, payload: initCanvas(avData, canvas.current)})
    const assetsUrl = "./api/v1/assets";
    const response = await fetch(`${assetsUrl}?gender=${avData.gender}`);
    const integrantsData = await response.json();
    dispatch({type: FETCH_ALL_AVATAR_ELEMENTS, payload: integrantsData});
  }
}

export const changeCategory = (category) => {
  return {
    type: CHANGE_CATEGORY,
    payload: category
  }
}

export const showItems = (integrants, category) => {
  return {
    type: SHOW_ITEMS,
    payload: integrants[category]
  }
}

export const changeAvIntegrant = (layers, asset, category) => {
  const assets = [];
  if (category === 'nose') {
    category = 'skin';
    assets.push(layers.skin.assets[0]);
    assets.push(asset);
  } else { assets.push(asset); }

  return {
    type: CHANGE_AV_INTEGRANT,
    payload: {
      category,
      assets
    }
  }
}

export const selectItem = (item) => {
  return {
    type: SELECT_ITEM,
    payload: item
  }
}

