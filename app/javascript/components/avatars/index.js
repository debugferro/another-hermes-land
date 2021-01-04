import grabElements from './initialize/grab_elements';
import updateCanvas from './update_canvas';
import initializeAssetsForColor from './initialize/skincolor/initialize_assets_for_color';
import initializeColor from './initialize/initialize_color';

import { getGender, getAssetsInfo } from './initialize/get_assets_info';

const avatarCreator = () => {
  window.onload = function() {
    // Getting img elements and constructing avatar canvas for the 1st time
    const dom = grabElements();
    updateCanvas(dom);

    const avGender = getGender();
    const assets = getAssetsInfo(avGender.allInfo, avGender.info)

    const currentFile = dom.imgBase.src.slice(dom.imgBase.src.lastIndexOf("/") + 1);
    const filteredAssets = initializeAssetsForColor(currentFile, assets);
    const assetColor = initializeColor();
  }
  console.log(assetColor);
}

export default avatarCreator;

    // {
    //   dom: dom,
    //   assets: assets,
    //   avatar: {
    //     gender: avGender,

    //   }
    // }
