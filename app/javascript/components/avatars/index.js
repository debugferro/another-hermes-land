import grabElements from './initialize/grab_elements';
import updateCanvas from './update_canvas';
import initializeAssetsForColor from './initialize/skincolor/initialize_assets_for_color';
import initializeColor from './initialize/color/initialize_color';

import { getGender, getAssetsInfo } from './initialize/get_assets_info';
import takeBtnFromDom from './initialize/take_btn_from_dom';

const avatarCreator = () => {
  let btn;
  window.onload = function() {
    // Getting img elements and constructing avatar canvas and assets for 1st time
    const avDom = grabElements();
    updateCanvas(avDom);
    // Getting avatar gender and all available assets for matching gender
    const avGender = getGender();
    const assets = getAssetsInfo(avGender.allInfo, avGender.info)
    // Getting all the current available colors for current assets
    const currentFile = avDom.imgBase.src.slice(avDom.imgBase.src.lastIndexOf("/") + 1);
    const filteredAssets = initializeAssetsForColor(currentFile, assets);
    const assetColor = initializeColor(avDom, assets);
    btn = takeBtnFromDom();
  }

console.log(btn);
}

export default avatarCreator;

    // {
    //   dom: dom,
    //   assets: assets,
    //   avatar: {
    //     gender: avGender,

    //   }
    // }
