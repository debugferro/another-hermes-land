import { grabElements, getAvatar } from './initialize/grab_elements';
import { initCanvas } from './update_canvas';
import changeGender from './change_gender';
import { fetchAssetsData, setIndex } from './initialize/get_assets_info';
import takeBtnFromDom from './initialize/take_btn_from_dom';

import { changeAsset, changeColor } from './change_asset';

// LOADEDCOLOR HAS MANY CLASS OBJECTS
// INDEXES ARE CLASS OBJECTS

const avatarCreator = () => {
  window.onload = async function() {
    // Getting html elements and getting avatar assets from database
    const avDom = grabElements();
    const avatar = await getAvatar();

    //const currentAssetOf = setCurrentAssets(avDom); // TO REMOVE
    //const avGender = getGender(); // TO REMOVE
    // Getting asset data from database
    const assets = await fetchAssetsData(avatar.gender);
    // Setting correspondant index for the assets that compose the present avatar
    // and initializing canvas and its layers
    const index = setIndex(assets, avatar);
    const layers = initCanvas(avDom, avatar);
    // const currentFile = avDom.imgBase.src.slice(avDom.imgBase.src.lastIndexOf("/") + 1); // TO REMOVE

    const btnTo = takeBtnFromDom();

    btnTo.change.face.color.addEventListener("click", () => {
      const input = document.getElementById("skin-color");
      input.click();
      input.addEventListener("input", () => {
        changeColor(event.target.value, layers.skin, 'base');
        if (layers.mouth.assets[0].skintonalized) {
          changeColor(event.target.value, layers.mouth, 'base');
        }
      })
    });
    // HAIR --------------------------------------------------------------------
    btnTo.change.hair.forward.addEventListener("click", () => {
      changeAsset(assets.hairs, 1, index.hair, layers.hair)
      console.log(layers.hair);
      console.log(layers.hair.assets[0].id)
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
    btnTo.change.eyebrows.color.addEventListener("click", () => {
      const input = document.getElementById("eyebrows-color");
      input.click();
      input.addEventListener("input", () => {
        changeColor(event.target.value, layers.eyebrows, 'base');
      })
    });
    // EYES --------------------------------------------------------------------
    btnTo.change.eyes.forward.addEventListener("click", () => {
      changeAsset(assets.eyes, 1, index.eyes, layers.eyes)
      console.log(layers.eyes);
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
      console.log(layers.eyes);
    });
    btnTo.change.eyes.makeup.addEventListener("click", () => {
      const input = document.getElementById("eyes-makeup-color");
      input.click();
      input.addEventListener("input", () => {
        changeColor(event.target.value, layers.eyes, 'components', 1);
      })
      console.log(layers.eyes);
    });
    // MOUTH -------------------------------------------------------------------
    btnTo.change.mouth.forward.addEventListener("click", () => {
      changeAsset(assets.mouths, 1, index.mouth, layers.mouth)
      console.log(layers.mouth);
    });
    btnTo.change.mouth.backwards.addEventListener("click", () => {
      changeAsset(assets.mouths, 0, index.mouth, layers.mouth)
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
      let dataURI   = avDom.masterLayer.toDataURL('image/png');
      let assetData = new Array();
      let colorData = {};
      for(let key in layers) {
       layers[key].assets.forEach((asset) => { if (asset) { assetData.push(asset.id) } })
       layers[key].assetColors.forEach((color) => { colorData[`${key}_color`] = [color]; })
       layers[key].componentColors.forEach((color) => { colorData[`${key}_color`].push(color); })
      }
      document.getElementById("avatar_img").value    = dataURI;
      document.getElementById("avatar_assets").value = assetData;
      document.getElementById("avatar_colors").value = JSON.stringify(colorData);
      form.submit();
    });
  }
}

export default avatarCreator;
