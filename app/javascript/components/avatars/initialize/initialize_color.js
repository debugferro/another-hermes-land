import initializeColorIndexes from './initialize_color_indexes';

export default function initializeColor(dom, assets) {
    let currentHair     = dom.imgHair.src.slice(dom.imgHair.src.lastIndexOf("/") + 1);
    let currentEyes     = dom.imgEyes.src.slice(dom.imgEyes.src.lastIndexOf("/") + 1);
    let currentEyebrows = dom.imgEyebrows.src.slice(dom.imgEyebrows.src.lastIndexOf("/") + 1);
    let currentAcessory = dom.imgAcessory.src.slice(dom.imgAcessory.src.lastIndexOf("/") + 1);


    let initializedValues       = initializeColorIndexes(currentHair, assets.hairColors);
    let selectedHairColors      = initializedValues.colors;
    let selectedHairColorsIndex = initializedValues.index;
    // INITIALIZING EYE COLORS
    initializedValues          = initializeColorIndexes(currentEyes, assets.eyeColors);
    let selectedEyeColors      = initializedValues.colors;
    let selectedEyeColorsIndex = initializedValues.index;
    // INITIALIZING EYEBROW COLORS
    initializedValues              = initializeColorIndexes(currentEyebrows, assets.eyebrowColors);
    let selectedEyebrowColors      = initializedValues.colors;
    let selectedEyebrowColorsIndex = initializedValues.index;
    // INITIALIZING ACESSORY COLORS
    initializedValues               = initializeColorIndexes(currentAcessory, assets.acessoryColors);
    let selectedAcessoryColors      = initializedValues.colors;
    let selectedAcessoryColorsIndex = initializedValues.index;

    return {
      hair: {
        colors: selectedHairColors,
        index: selectedHairColorsIndex
      },
      eyes: {
        colors: selectedEyeColors,
        index: selectedEyeColorsIndex
      },
      eyebrows: {
        colors: selectedEyebrowColors,
        index: selectedEyebrowColorsIndex
      },
      acessories: {
        colors: selectedAcessoryColors,
        index: selectedAcessoryColorsIndex
      }
    }
}
