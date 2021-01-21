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
    //const avGender = getGender(); // TO REMOVE

    const assets = await fetchAssetsData(avatar.gender);
    const index = setIndex(assets, avatar);
    const layers = initCanvas(avDom, avatar);
    const mainCanvas = null;
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
      changeAsset(assets.hairs, 1, index.hair, layers.hair)
    });
    btnTo.change.hair.backwards.addEventListener("click", () => {
      changeAsset(assets.hairs, 0, index.hair, layers.hair)
    });
    btnTo.change.hair.color.addEventListener("click", () => {
      const input = document.getElementById("hair-color");
      input.click();
      input.addEventListener("input", () => {
        changeColor(event.target.value, layers.hair, 'base');
      })
    });
    // EYEBROWS ----------------------------------------------------------------
    btnTo.change.eyebrows.forward.addEventListener("click", () => {
      changeAsset(assets.eyebrows, 1, index.eyebrows, layers.eyebrows)
    });

    btnTo.change.eyebrows.backwards.addEventListener("click", () => {
      changeAsset(assets.eyebrows, 0, index.eyebrows, layers.eyebrows)
    });
    // btnTo.change.eyebrows.color.addEventListener("click", () => {
    //   const input = document.getElementById("eyebrows-color");
    //   input.click();
    //   input.addEventListener("input", () => {
    //     changeColor(event.target.value, mainCanvas.layers.eyebrows, mainCanvas)
    //   })
    // });
    // EYES --------------------------------------------------------------------
    btnTo.change.eyes.forward.addEventListener("click", () => {
      changeAsset(assets.eyes, 1, index.eyes, layers.eyes)
    });
    btnTo.change.eyes.backwards.addEventListener("click", () => {
      changeAsset(assets.eyes, 0, index.eyes, layers.eyes)
    });
    btnTo.change.eyes.color.addEventListener("click", () => {
      const input = document.getElementById("eyes-color");
      input.click();
      input.addEventListener("input", () => {
        changeColor(event.target.value, layers.eyes, 'components', 0);
      })
    });
    // MOUTH -------------------------------------------------------------------
    btnTo.change.mouth.forward.addEventListener("click", () => {
      changeAsset(assets.mouths, 1, index.mouth, layers.skin, [avatar.face, avatar.nose])
    });
    btnTo.change.mouth.backwards.addEventListener("click", () => {
      changeAsset(assets.mouths, 0, index.mouth, layers.skin, [avatar.face, avatar.nose])
    });
    // NOSE --------------------------------------------------------------------
    btnTo.change.nose.forward.addEventListener("click", () => {
      changeAsset(assets.noses, 1, index.nose, layers.skin, [avatar.face, avatar.mouth])
    });
    btnTo.change.nose.backwards.addEventListener("click", () => {
      changeAsset(assets.noses, 0, index.nose, layers.skin, [avatar.face, avatar.mouth])
    });
    // // ACESSORY ----------------------------------------------------------------
    btnTo.change.acessories.forward.addEventListener("click", () => {
      changeAsset(assets.acessories, 1, index.acessory, layers.acessory)
    });
    btnTo.change.acessories.backwards.addEventListener("click", () => {
      changeAsset(assets.acessories, 0, index.acessory, layers.acessory)
    });
    // btnTo.change.acessories.color.addEventListener("click", () => {
    //   changeColor(assetColorOpt.acessories, avDom.imgAcessory);
    // });
    // // CLOTHES -----------------------------------------------------------------
    btnTo.change.clothes.forward.addEventListener("click", () => {
      changeAsset(assets.clothes, 1, index.clothe, layers.clothe)
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
