import initializeColorIndexes from './initialize_index';

class AssetColor {
  constructor(colors, index) {
    this.colors = colors;
    this.index = index;
  }

  changeIndex(index) {
    this.index = index;
  }

  changeColors(colors) {
    this.colors = colors;
  }
}


export default function initializeColors(dom, assets) {
    let currentHair     = dom.imgHair.src.slice(dom.imgHair.src.lastIndexOf("/") + 1);
    let currentEyes     = dom.imgEyes.src.slice(dom.imgEyes.src.lastIndexOf("/") + 1);
    let currentEyebrows = dom.imgEyebrows.src.slice(dom.imgEyebrows.src.lastIndexOf("/") + 1);
    let currentAcessory = dom.imgAcessory.src.slice(dom.imgAcessory.src.lastIndexOf("/") + 1);
    let currentBase     = dom.imgBase.src.slice(dom.imgBase.src.lastIndexOf("/") + 1);

    let initializedValues = initializeColorIndexes(currentHair, assets.hairColors);
    let selectedHair      = initializedValues
    // INITIALIZING EYE COLORS
    initializedValues = initializeColorIndexes(currentEyes, assets.eyeColors);
    let selectedEye   = initializedValues
    // INITIALIZING EYEBROW COLORS
    initializedValues   = initializeColorIndexes(currentEyebrows, assets.eyebrowColors);
    let selectedEyebrow = initializedValues
    // INITIALIZING ACESSORY COLORS
    initializedValues    = initializeColorIndexes(currentAcessory, assets.acessoryColors);
    let selectedAcessory = initializedValues

    initializedValues = initializeColorIndexes(currentBase, assets.baseColors);
    let selectedBase  = initializedValues

    return {
      base: new AssetColor(selectedBase.colors, selectedBase.index),
      hair: new AssetColor(selectedHair.colors, selectedHair.index),
      eyes: new AssetColor(selectedEye.colors, selectedEye.index),
      eyebrows: new AssetColor(selectedEyebrow.colors, selectedEyebrow.index),
      acessories: new AssetColor(selectedAcessory.colors, selectedAcessory.index)
    }
}
