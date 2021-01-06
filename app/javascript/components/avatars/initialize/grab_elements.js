export function grabElements() {
  return(
    {
      imgBase: document.getElementById("face"),
      imgHair: document.getElementById("hair"),
      imgMouth: document.getElementById("mouth"),
      imgEyes: document.getElementById("eyes"),
      imgEyebrows: document.getElementById("eyebrows"),
      imgNose: document.getElementById("nose"),
      imgCloth: document.getElementById("cloth") ?? '',
      imgAcessory: document.getElementById("acessory") ?? '',
      resAvatar: document.querySelector(".result")
    }
  );
}

export function setCurrentAssets(avDom) {
  return(
    {
      base: avDom.imgBase.src.slice(avDom.imgBase.src.lastIndexOf("/") + 1),
      hair: avDom.imgHair.src.slice(avDom.imgHair.src.lastIndexOf("/") + 1),
      mouth: avDom.imgMouth.src.slice(avDom.imgMouth.src.lastIndexOf("/") + 1),
      eyes: avDom.imgEyes.src.slice(avDom.imgEyes.src.lastIndexOf("/") + 1),
      eyebrows: avDom.imgEyebrows.src.slice(avDom.imgEyebrows.src.lastIndexOf("/") + 1),
      nose: avDom.imgNose.src.slice(avDom.imgNose.src.lastIndexOf("/") + 1),
      clothes: avDom.imgCloth.src.slice(avDom.imgCloth.src.lastIndexOf("/") + 1),
      acessory: avDom.imgAcessory.src.slice(avDom.imgAcessory.src.lastIndexOf("/") + 1)
    }
  );
}
