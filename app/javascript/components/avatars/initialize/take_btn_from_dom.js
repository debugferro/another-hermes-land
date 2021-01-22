export default function takeBtnFromDom() {
  let btnBase = document.querySelector(".Btn-base");
  let btnSkin = document.querySelector(".Btn-skincolor");
  // ---------------------------------------------------------------------------
  let btnEyes     = document.querySelector(".Btn-eyes");
  let btnEyesBack = document.querySelector(".Btn-eyesback");
  let btnEyeColor = document.querySelector(".Btn-eyecolor");
  let btnMakeUpColor = document.querySelector(".Btn-makeupcolor");
  // ---------------------------------------------------------------------------
  let btnHair      = document.querySelector(".Btn-hair");
  let btnHairBack  = document.querySelector(".Btn-hairback");
  let btnHairColor = document.querySelector(".Btn-haircolor");
  // ---------------------------------------------------------------------------
  let btnMouth     = document.querySelector(".Btn-mouth");
  let btnMouthBack = document.querySelector(".Btn-mouthback");
  // ---------------------------------------------------------------------------
  let btnEyebrows     = document.querySelector(".Btn-eyebrows");
  let btnEyebrowsBack = document.querySelector(".Btn-eyebrowsback");
  let btnEyebrowColor = document.querySelector(".Btn-eyebrowcolor");
  // ---------------------------------------------------------------------------
  let btnNose     = document.querySelector(".Btn-nose");
  let btnNoseBack = document.querySelector(".Btn-noseback");
  let btnCloth    = document.querySelector(".Btn-cloth");
  // ---------------------------------------------------------------------------
  let btnAcessory      = document.querySelector(".Btn-acessory");
  let btnAcessoryBack  = document.querySelector(".Btn-acessoryback");
  let btnAcessoryColor = document.querySelector(".Btn-acessorycolor");
  // ---------------------------------------------------------------------------
  let btnSave   = document.querySelector(".Btn-save");
  let btnMale   = document.querySelector(".Btn-male");
  let btnFemale = document.querySelector(".Btn-female");
  return {
    change: {
      face: {
        forward: btnBase,
        color: btnSkin
      },
      eyes: {
        forward: btnEyes,
        backwards: btnEyesBack,
        color: btnEyeColor,
        makeup: btnMakeUpColor
      },
      hair: {
        forward: btnHair,
        backwards: btnHairBack,
        color: btnHairColor
      },
      mouth: {
        forward: btnMouth,
        backwards: btnMouthBack
      },
      eyebrows: {
        forward: btnEyebrows,
        backwards: btnEyebrowsBack,
        color: btnEyebrowColor
      },
      nose: {
        forward: btnNose,
        backwards: btnNoseBack
      },
      clothes: {
        forward: btnCloth
      },
      acessories: {
        forward: btnAcessory,
        backwards: btnAcessoryBack,
        color: btnAcessoryColor
      },
      gender: {
        toMale: btnMale,
        toFemale: btnFemale
      }
    },
    save: btnSave
  }
}
