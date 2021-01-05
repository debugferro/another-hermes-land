import initializeColorIndexes from './initialize/color/initialize_index';
import grabElements from './initialize/grab_elements';
import updateCanvas from './update_canvas';

const iterateBackOrForward = (array, index, direction) => {
    if(index > array.length - 1) {
      index = 0;
    }
    if (direction == 1){
      if(index == array.length-1) {
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

export function changeAsset(assets, dom, movingDirection, assetIndex, allAssetsColors = null, loadedColor = null ) {
  assetIndex.changeIndex(iterateBackOrForward(assets, assetIndex.index, movingDirection).direction);
  let currentAsset = assets[assetIndex.index];
  // INITIALIZING CURRENT HAIR COLOR FILES AND INDEX
  // SETTING CURRENT HAIR COLORS AND EQUIVALENT INDEX
  console.log(loadedColor);
  if (allAssetsColors) {
    let initializedValues = initializeColorIndexes(currentAsset, allAssetsColors);
    loadedColor.changeColors(initializedValues.colors)
    loadedColor.changeIndex(initializedValues.index)
  }
  // -------------------------------------------------
  dom.src = `/avatar/${currentAsset}`
  dom.addEventListener("load", function () {
    updateCanvas(grabElements());
  });
};

export function changeColor(loadedColor, dom) {
  loadedColor.changeIndex(iterateBackOrForward(loadedColor.colors, loadedColor.index, 1).direction);
  let currentColor = loadedColor.colors[loadedColor.index];
  // let currentColor = selectedHairColors[selectedHairColorsIndex++%selectedHairColors.length]
  if (currentColor && currentColor.length > 0) {
    dom.src = `/avatar/${currentColor}`
    dom.addEventListener("load", function () {
      updateCanvas(grabElements());
    });
  }
}
