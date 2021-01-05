import { grabElements, setCurrentAssets } from './initialize/grab_elements';
import updateCanvas from './update_canvas';
import initializeAssetsForColor from './initialize/skincolor/initialize_assets_for_color';
import initializeColors from './initialize/color/initialize_color';

import { getGender, getAssetsInfo, setIndex } from './initialize/get_assets_info';
import takeBtnFromDom from './initialize/take_btn_from_dom';

import { changeAsset, changeColor } from './change_asset';

// LOADEDCOLOR HAS MANY CLASS OBJECTS
// INDEXES ARE CLASS OBJECTS

const avatarCreator = () => {
  window.onload = function() {
    // Getting img elements and constructing avatar canvas and assets for 1st time
    const avDom = grabElements();
    updateCanvas(avDom);
    const currentAssetOf = setCurrentAssets(avDom);
    // Getting avatar gender and all available assets for matching gender
    const avGender = getGender();
    const assets = getAssetsInfo(avGender.allInfo, avGender.info);
    const index = setIndex(assets, currentAssetOf);
    // Getting all the current available colors for current assets
    const currentFile = avDom.imgBase.src.slice(avDom.imgBase.src.lastIndexOf("/") + 1);
    const filteredAssets = initializeAssetsForColor(currentFile, assets);
    const assetColorOpt = initializeColors(avDom, assets);
    const btnTo = takeBtnFromDom();


    // CHANGE ASSETS PARAMS: assets, avDom, movingDirection, assetIndex, allAssetsColors = null, assetColorOpt = null
    // CHANGE COLOR PARAMS: assetColorOpt, avDom


    // HAIR --------------------------------------------------------------------
    btnTo.change.hair.forward.addEventListener("click", () => {
      changeAsset(assets.hairs, avDom.imgHair, 1, index.hair, assets.hairColors, assetColorOpt.hair)
    });

    btnTo.change.hair.backwards.addEventListener("click", () => {
      changeAsset(assets.hairs, avDom.imgHair, 0, index.hair, assets.hairColors, assetColorOpt.hair)
    });
    btnTo.change.hair.color.addEventListener("click", () => {
      changeColor(assetColorOpt.hair, avDom.imgHair)
    });
    // EYEBROWS ----------------------------------------------------------------
    btnTo.change.eyebrows.forward.addEventListener("click", () => {
      changeAsset(assets.eyebrows, avDom.imgEyebrows, 1, index.eyebrows, assets.eyebrowColors, assetColorOpt.eyebrows)
    });

    btnTo.change.eyebrows.backwards.addEventListener("click", () => {
      changeAsset(assets.hairs, avDom.imgHair, 0, index.hair, assets.hairColors, assetColorOpt.hair)
    });
    btnTo.change.eyebrows.color.addEventListener("click", () => {
      changeColor(assetColorOpt.hair, avDom.imgHair)
    });
  }
}

export default avatarCreator;

    // {
    //   dom: dom,
    //   assets: assets,
    //   avatar: {
    //     gender: avGender,

    //   }
    // }
