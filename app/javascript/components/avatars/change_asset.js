import { resolveIdPattern } from './initialize/skincolor/initialize_assets_for_color';
import initializeColorIndexes from './initialize/color/initialize_index';
import { grabElements } from './initialize/grab_elements';
import { initializeCanvas, updateCanvas } from './update_canvas';
// import takeBtnFromDom from './initialize/take_btn_from_dom';

const iterateBackOrForward = (array, index, direction) => {
    if(index > array.length - 1) {
      index = 0;
    }

    if (direction == 1){
      if(index == array.length - 1) {
        index = 0;
      }
      else
      {
        index = index + 1;
      }
      return {
        direction: index
      }
    } else {
      if(index == 0 || index < 0) {
        index = array.length - 1;
      } else {
        index = index - 1;
      }
      return {
        direction: index
      }
    }
  }

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


export function changeAsset(assets, movingDirection, assetIndex, layer, connections = null) {
  assetIndex.changeIndex(iterateBackOrForward(assets, assetIndex.index, movingDirection).direction);
  let currentAsset = assets[assetIndex.index];
  if (connections) {
    connections.push(currentAsset)
    layer.change(connections)
  } else {
    layer.change([currentAsset])
  }
}


// export function changeAsset(basicAssets, avDom, movingDirection, assetIndex, layer, mainCanvas) {
//   assetIndex.changeIndex(iterateBackOrForward(basicAssets, assetIndex.index, movingDirection).direction);
//   let currentAsset = basicAssets[assetIndex.index];
//   avDom.src = `/avatar/${currentAsset.base}`
//   avDom.addEventListener("load", function () {
//     //layer.assets = [avDom];
//     mainCanvas.context.clearRect(0, 0, layer.info.layer.width, layer.info.layer.height);
//     if (currentAsset.components) {
//       layer.assets.push(currentAsset.components)
//     }
//     layer.draw();
//     updateCanvas(grabElements(), mainCanvas.context, mainCanvas.layers)
//   });
// }

// ----------------------------------------------------------------------------

export function changeColor(input, layer, mainCanvas) {
  const color = hexToRgb(input);
  mainCanvas.context.clearRect(0, 0, layer.info.layer.width, layer.info.layer.height)
  layer.color = color;
  layer.draw();
  updateCanvas(grabElements(), mainCanvas.context, mainCanvas.layers)
}

export function changeInnerLayer(basicAssets, avDom, movingDirection, assetIndex, target, mainCanvas) {
  assetIndex.changeIndex(iterateBackOrForward(basicAssets, assetIndex.index, movingDirection).direction);
  let currentAsset = basicAssets[assetIndex.index];
  avDom.src = `/avatar/${currentAsset.base}`
  avDom.addEventListener("load", function () {
    //layer.assets = [avDom];
    const info = mainCanvas.layers.base.info
    mainCanvas.context.clearRect(0, 0, info.layer.width, info.layer.height);
    mainCanvas.layers.base.draw();
    updateCanvas(grabElements(), mainCanvas.context, mainCanvas.layers)
  });
}
