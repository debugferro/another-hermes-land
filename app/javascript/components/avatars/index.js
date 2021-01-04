import grabElements from './initialize/grab_elements';
import updateCanvas from './update_canvas';
import initializeAssetsForColor from './initialize/skincolor/initialize_assets_for_color';
import initializeColor from './initialize/color/initialize_color';

import { getGender, getAssetsInfo } from './initialize/get_assets_info';

const avatarCreator = () => {
  window.onload = function() {
    // Getting img elements and constructing avatar canvas for the 1st time
    const avDom = grabElements();
    updateCanvas(avDom);

    const avGender = getGender();
    const assets = getAssetsInfo(avGender.allInfo, avGender.info)

    const currentFile = avDom.imgBase.src.slice(avDom.imgBase.src.lastIndexOf("/") + 1);
    const filteredAssets = initializeAssetsForColor(currentFile, assets);
    const assetColor = initializeColor(avDom, assets);
    console.log(assetColor);
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
