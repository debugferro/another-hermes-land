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

// ----------------------------------------------------------------------------

// export function changeAsset(basicAssets, avDom, movingDirection, assetIndex, allAssetsColors = null, assetColorOpt = null ) {
//   // iterating over existing assets options
//   assetIndex.changeIndex(iterateBackOrForward(basicAssets, assetIndex.index, movingDirection).direction);
//   let currentAsset = basicAssets[assetIndex.index];
//   // loading existing colors options for the new asset
//   if (allAssetsColors) {
//     let initializedValues = initializeColorIndexes(currentAsset, allAssetsColors);
//     assetColorOpt.changeColors(initializedValues.colors)
//     assetColorOpt.changeIndex(initializedValues.index)
//   }
//   // sending changes to canvas:
//   console.log(currentAsset)
//   avDom.src = `/avatar/${currentAsset}`
//   avDom.addEventListener("load", function () {
//     updateCanvas(grabElements());
//   });
// };

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


export function changeAsset(basicAssets, avDom, movingDirection, assetIndex, layer, mainCanvas) {
  assetIndex.changeIndex(iterateBackOrForward(basicAssets, assetIndex.index, movingDirection).direction);
  let currentAsset = basicAssets[assetIndex.index];
  avDom.src = `/avatar/${currentAsset}`
  avDom.addEventListener("load", function () {
    console.log(`layer was: ${layer._assets[0].src}`)
    //layer.assets = [avDom];
    mainCanvas.context.clearRect(0, 0, layer._info.layer.width, layer._info.layer.height);
    layer.draw();
    layer.color();
    updateCanvas(grabElements(), mainCanvas.context, mainCanvas.layers)
    console.log(`layer now is: ${mainCanvas.layers.hair._assets[0].src}`)
  });
}

// ----------------------------------------------------------------------------

export function changeColor(input, layer, mainCanvas) {
  const color = hexToRgb(input);
  mainCanvas.context.clearRect(0, 0, layer._info.layer.width, layer._info.layer.height)
  layer.draw();
  const imageData = layer._info.ctx.getImageData(0, 0, layer._info.layer.width, layer._info.layer.height); // Recebo array com a cor dos pixels
  const data = imageData.data
  const divisor = 1.5;
  console.log(divisor)
  for (let i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
  // if (data[i] > 152 || data[i + 1] > 116 || data[i + 2] > 50) {
    let newR = !color.r ? 0 : color.r - data[i]/divisor;  // Vejo a diferença entre o atual valor do pixel
    let newG = !color.g ? 0 : color.g - data[i + 1]/divisor;  // e o valor que ele tem que chegar pra nova cor
    let newB = !color.b ? 0 : color.b - data[i + 2]/divisor; // divido por 1.5 pra não estourar mt a cor
    data[i]     += newR;
    data[i + 1] += newG;  // Atribuo os novos valores somando o necessário que faltava
    data[i + 2] += newB;
    // }
    }
  layer._color = color;
  layer._info.ctx.putImageData(imageData, 0, 0);
  updateCanvas(grabElements(), mainCanvas.context, mainCanvas.layers)
}

export function changeSkinColor(assetColorOpt, avDom, filteredAssets, assets, btnTo) {
  assetColorOpt.changeIndex(iterateBackOrForward(assetColorOpt.colors, assetColorOpt.index, 1).direction);
  let currentColor = assetColorOpt.colors[assetColorOpt.index];
  // resolving idPattern based on the current new color
  const idPattern = resolveIdPattern(currentColor);
  // redefining available assets based on the new skin color
  filteredAssets.redefineAssets(assets, idPattern);
  // TODO: change mouth, nose and eyes for its correspondent in the new skin color
  btnTo.change.mouth.forward.click();
  btnTo.change.nose.forward.click();
  btnTo.change.eyes.forward.click();
  // sending changes to canvas:
  avDom.src = `/avatar/${currentColor}`
    avDom.addEventListener("load", function () {
    updateCanvas(grabElements());
  });
}
