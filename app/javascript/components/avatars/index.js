import { grabElements, setCurrentAssets, getAvatar } from './initialize/grab_elements';
import { initializeCanvas, updateCanvas, initCanvas } from './update_canvas';
import { initializeAssetsForColor } from './initialize/skincolor/initialize_assets_for_color';
import initializeColors from './initialize/color/initialize_color';

import changeGender from './change_gender';
import { getGender, fetchAssetsData, setIndex } from './initialize/get_assets_info';
import takeBtnFromDom from './initialize/take_btn_from_dom';

import { changeAsset, changeColor, changeInnerLayer } from './change_asset';

// LOADEDCOLOR HAS MANY CLASS OBJECTS
// INDEXES ARE CLASS OBJECTS

const avatarCreator = () => {
  window.onload = async function() {
    // Getting img elements and constructing avatar canvas and assets for 1st time
    const avDom = grabElements();
    const avatar = await getAvatar();
    //const currentAssetOf = setCurrentAssets(avDom); // TO REMOVE

    const avGender = getGender(); // TO REMOVE
    const assets = await fetchAssetsData(avatar.gender);
    const index = setIndex(assets, avatar); // TO REDO
    const mainCanvas = initCanvas(avDom, avatar);
    // // Getting avatar gender and all available assets for matching gender

    // // Getting all the current available colors for current assets
    const currentFile = avDom.imgBase.src.slice(avDom.imgBase.src.lastIndexOf("/") + 1);
    // const filteredAssets = initializeAssetsForColor(currentFile, assets);
    // // Getting current loaded assets index
    // const assetColorOpt = initializeColors(avDom, assets);
    const btnTo = takeBtnFromDom();
    // console.log(filteredAssets.eyes);


    // CHANGE ASSETS PARAMS: assets, avDom, movingDirection, assetIndex, allAssetsColors = null, assetColorOpt = null
    // CHANGE COLOR PARAMS: assetColorOpt, avDom

    btnTo.change.face.color.addEventListener("click", () => {
      const input = document.getElementById("skin-color");
      input.click();
      input.addEventListener("input", () => {
        changeColor(event.target.value, mainCanvas.layers.base, mainCanvas)
      })
    });
    // HAIR --------------------------------------------------------------------
    btnTo.change.hair.forward.addEventListener("click", () => {
      changeAsset(assets.hairs, avDom.imgHair, 1, index.hair, mainCanvas.hair, mainCanvas)
    });
    btnTo.change.hair.backwards.addEventListener("click", () => {
      changeAsset(assets.hairs, avDom.imgHair, 0, index.hair, mainCanvas.layers.hair, mainCanvas)
    });
    btnTo.change.hair.color.addEventListener("click", () => {
      const input = document.getElementById("hair-color");
      input.click();
      input.addEventListener("input", () => {
        changeColor(event.target.value, mainCanvas.layers.hair, mainCanvas)
      })
    });
    // EYEBROWS ----------------------------------------------------------------
    btnTo.change.eyebrows.forward.addEventListener("click", () => {
      changeAsset(assets.eyebrows, avDom.imgEyebrows, 1, index.eyebrows, mainCanvas.layers.eyebrows, mainCanvas)
    });

    btnTo.change.eyebrows.backwards.addEventListener("click", () => {
      changeAsset(assets.eyebrows, avDom.imgEyebrows, 0, index.eyebrows, mainCanvas.layers.eyebrows, mainCanvas)
    });
    btnTo.change.eyebrows.color.addEventListener("click", () => {
      const input = document.getElementById("eyebrows-color");
      input.click();
      input.addEventListener("input", () => {
        changeColor(event.target.value, mainCanvas.layers.eyebrows, mainCanvas)
      })
    });
    // EYES --------------------------------------------------------------------
    btnTo.change.eyes.forward.addEventListener("click", () => {
      changeAsset(assets.eyes, avDom.imgEyes, 1, index.eyes, mainCanvas.layers.eyes, mainCanvas)
    });
    btnTo.change.eyes.backwards.addEventListener("click", () => {
      changeAsset(assets.eyes, avDom.imgEyes, 0, index.eyes, mainCanvas.layers.eyes, mainCanvas)
    });
    // btnTo.change.eyes.color.addEventListener("click", () => {
    //   changeColor(assetColorOpt.eyes, avDom.imgEyes);
    // });
    // MOUTH -------------------------------------------------------------------
    btnTo.change.mouth.forward.addEventListener("click", () => {
      changeInnerLayer(assets.mouths, avDom.imgMouth, 1, index.mouth, 'mouth', mainCanvas)
    });
    btnTo.change.mouth.backwards.addEventListener("click", () => {
      changeInnerLayer(assets.mouths, avDom.imgMouth, 0, index.mouth, 'mouth', mainCanvas)
    });
    // NOSE --------------------------------------------------------------------
    btnTo.change.nose.forward.addEventListener("click", () => {
      changeInnerLayer(assets.noses, avDom.imgNose, 1, index.nose, 'nose', mainCanvas)
    });
    btnTo.change.nose.backwards.addEventListener("click", () => {
      changeInnerLayer(assets.noses, avDom.imgNose, 0, index.nose, 'nose', mainCanvas)
    });
    // // ACESSORY ----------------------------------------------------------------
    btnTo.change.acessories.forward.addEventListener("click", () => {
      changeAsset(assets.acessories, avDom.imgAcessory, 1, index.acessory, mainCanvas.layers.acessory, mainCanvas)
    });
    btnTo.change.acessories.backwards.addEventListener("click", () => {
      changeAsset(assets.acessories, avDom.imgAcessory, 0, index.acessory, mainCanvas.layers.acessory, mainCanvas)
    });
    // btnTo.change.acessories.color.addEventListener("click", () => {
    //   changeColor(assetColorOpt.acessories, avDom.imgAcessory);
    // });
    // // CLOTHES -----------------------------------------------------------------
    btnTo.change.clothes.forward.addEventListener("click", () => {
      changeAsset(assets.clothes, avDom.imgCloth, 1, index.clothes, mainCanvas.layers.clothe, mainCanvas)
    });
    // // GENDER ------------------------------------------------------------------
    btnTo.change.gender.toMale.addEventListener("click", () => {
      changeGender("male");
    });
    btnTo.change.gender.toFemale.addEventListener("click", () => {
      changeGender("female");
    });
    btnTo.save.addEventListener("click", () => {
      let form      = document.querySelector(".sendAvatar");
      let dataURI   = avDom.resAvatar.toDataURL('image/png');
      let assetData = new Array (avDom.imgBase.src.slice(avDom.imgBase.src.lastIndexOf("/") + 1), avDom.imgHair.src.slice(avDom.imgHair.src.lastIndexOf("/") + 1),
        avDom.imgMouth.src.slice(avDom.imgMouth.src.lastIndexOf("/") + 1), avDom.imgEyes.src.slice(avDom.imgEyes.src.lastIndexOf("/") + 1),
        avDom.imgEyebrows.src.slice(avDom.imgEyebrows.src.lastIndexOf("/") + 1), avDom.imgNose.src.slice(avDom.imgNose.src.lastIndexOf("/") + 1),
        avDom.imgCloth.src.slice(avDom.imgCloth.src.lastIndexOf("/") + 1), avDom.imgAcessory.src.slice(avDom.imgAcessory.src.lastIndexOf("/") + 1)
        );
      document.getElementById("avatar_img").value        = dataURI;
      document.getElementById("avatar_appearance").value = assetData;
      form.submit();
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
