import initializeColorIndexes from './initialize/color/initialize_index';
import { grabElements } from './initialize/grab_elements';
import updateCanvas from './update_canvas';

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
      if(index == 0) {
        index = array.length - 1;
      } else {
        index = index - 1;
      }
      return {
        direction: index
      }
    }
  }

// ----------------------------------------------------------------------------

export function changeAsset(basicAssets, avDom, movingDirection, assetIndex, allAssetsColors = null, assetColorOpt = null ) {
  // iterating over existing assets options
  assetIndex.changeIndex(iterateBackOrForward(basicAssets, assetIndex.index, movingDirection).direction);
  let currentAsset = basicAssets[assetIndex.index];
  // loading existing colors options for the new asset
  if (allAssetsColors) {
    let initializedValues = initializeColorIndexes(currentAsset, allAssetsColors);
    assetColorOpt.changeColors(initializedValues.colors)
    assetColorOpt.changeIndex(initializedValues.index)
  }
  // sending changes to canvas:
  console.log(currentAsset)
  avDom.src = `/avatar/${currentAsset}`
  avDom.addEventListener("load", function () {
    updateCanvas(grabElements());
  });
};

// ----------------------------------------------------------------------------

export function changeColor(assetColorOpt, avDom) {
  // iterating over existing color options
  assetColorOpt.changeIndex(iterateBackOrForward(assetColorOpt.colors, assetColorOpt.index, 1).direction);
  let currentColor = assetColorOpt.colors[assetColorOpt.index];
  // sending changes to canvas:
  if (currentColor && currentColor.length > 0) {
    avDom.src = `/avatar/${currentColor}`
    avDom.addEventListener("load", function () {
      updateCanvas(grabElements());
    });
  }
}
