export default function initializeColor() {
    let currentHair     = imgHair.src.slice(imgHair.src.lastIndexOf("/") + 1);
    let currentEyes     = imgEyes.src.slice(imgEyes.src.lastIndexOf("/") + 1);
    let currentEyebrows = imgEyebrows.src.slice(imgEyebrows.src.lastIndexOf("/") + 1);
    let currentAcessory = imgAcessory.src.slice(imgAcessory.src.lastIndexOf("/") + 1);


    let initializedValues       = initializeColorIndexes(currentHair, hairColors);
    let selectedHairColors      = initializedValues.colors;
    let selectedHairColorsIndex = initializedValues.index;
    // INITIALIZING EYE COLORS
    initializedValues          = initializeColorIndexes(currentEyes, eyeColors);
    let selectedEyeColors      = initializedValues.colors;
    let selectedEyeColorsIndex = initializedValues.index;
    // INITIALIZING EYEBROW COLORS
    initializedValues              = initializeColorIndexes(currentEyebrows, eyebrowColors);
    let selectedEyebrowColors      = initializedValues.colors;
    let selectedEyebrowColorsIndex = initializedValues.index;
    // INITIALIZING ACESSORY COLORS
    initializedValues               = initializeColorIndexes(currentAcessory, acessoryColors);
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
