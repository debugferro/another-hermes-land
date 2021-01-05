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


export default function initializeColor(dom, assets) {
    let currentHair     = dom.imgHair.src.slice(dom.imgHair.src.lastIndexOf("/") + 1);
    let currentEyes     = dom.imgEyes.src.slice(dom.imgEyes.src.lastIndexOf("/") + 1);
    let currentEyebrows = dom.imgEyebrows.src.slice(dom.imgEyebrows.src.lastIndexOf("/") + 1);
    let currentAcessory = dom.imgAcessory.src.slice(dom.imgAcessory.src.lastIndexOf("/") + 1);

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

    return {
      hair: new AssetColor(selectedHair.colors, selectedHair.index),
      eyes: {
        colors: selectedEye.colors,
        index: selectedEye.index
      },
      eyebrows: {
        colors: selectedEyebrow.colors,
        index: selectedEyebrow.index
      },
      acessories: {
        colors: selectedAcessory.colors,
        index: selectedAcessory.index
      }
    }
}
