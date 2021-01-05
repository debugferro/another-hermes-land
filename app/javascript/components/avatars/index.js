import grabElements from './initialize/grab_elements';
import updateCanvas from './update_canvas';
import initializeAssetsForColor from './initialize/skincolor/initialize_assets_for_color';
import initializeColor from './initialize/color/initialize_color';

import { getGender, getAssetsInfo, setIndex } from './initialize/get_assets_info';
import takeBtnFromDom from './initialize/take_btn_from_dom';

import { changeAsset, changeColor } from './change_asset';

const avatarCreator = () => {
  window.onload = function() {
    // Getting img elements and constructing avatar canvas and assets for 1st time
    const avDom = grabElements();
    updateCanvas(avDom);
    const index = setIndex();
    // Getting avatar gender and all available assets for matching gender
    const avGender = getGender();
    const assets = getAssetsInfo(avGender.allInfo, avGender.info)
    // Getting all the current available colors for current assets
    const currentFile = avDom.imgBase.src.slice(avDom.imgBase.src.lastIndexOf("/") + 1);
    const filteredAssets = initializeAssetsForColor(currentFile, assets);
    const loadedColor = initializeColor(avDom, assets);
    console.log(loadedColor);
    const btnTo = takeBtnFromDom();


    // CHANGE ASSETS PARAMS: assets, dom, movingDirection, assetIndex, allAssetsColors = null, loadedColor = null
    btnTo.change.hair.forward.addEventListener("click", () => {
      changeAsset(assets.hairs, avDom.imgHair, 1, index.hair, assets.hairColors, loadedColor.hair)
    });

    btnTo.change.hair.backwards.addEventListener("click", () => {
      changeAsset(assets.hairs, avDom.imgHair, 0, index.hair, assets.hairColors, loadedColor.hair)
    });
    btnTo.change.hair.color.addEventListener("click", () => {
      changeColor(loadedColor.hair, avDom.imgHair)
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
