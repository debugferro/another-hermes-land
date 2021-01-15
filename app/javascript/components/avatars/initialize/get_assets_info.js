import $ from 'jquery';



export function getGender() {
  let avatarInfos = $('.avatar_information');
  return {
    allInfo: avatarInfos,
    info: avatarInfos.data('gender')
  }
}

export async function fetchAssetsData(gender) {
  const BASE_URL = "./api/v1/assets";
  const response = await fetch(`${BASE_URL}?gender=${gender}`);
  const data = await response.json();
  return data;
}

class assetIndex {
  constructor(index) {
    if (index >= 0) {
      this.index = index;
    } else {
      this.index = 0;
    }
  }

  changeIndex(newIndex) {
    this.index = newIndex;
  }
}

export function setIndex(assets, currentAssetOf) {
  return {
    base: new assetIndex(0),
    hair: new assetIndex(assets.hairs.findIndex(assetObj => assetObj.base === currentAssetOf.hair)),
    eyes: new assetIndex(assets.eyes.findIndex(assetObj => assetObj.base === currentAssetOf.eyes)),
    mouth: new assetIndex(assets.mouths.findIndex(assetObj => assetObj.base === currentAssetOf.mouth)),
    eyebrows: new assetIndex(assets.eyebrows.findIndex(assetObj => assetObj.base === currentAssetOf.eyebrows)),
    nose: new assetIndex(assets.noses.findIndex(assetObj => assetObj.base === currentAssetOf.nose)),
    clothes: new assetIndex(assets.clothes.findIndex(assetObj => assetObj.base === currentAssetOf.clothes)),
    acessory: new assetIndex(assets.acessories.findIndex(assetObj => assetObj.base === currentAssetOf.acessory))
  }
}

// const index = setIndex();

// export { index };

// export function getAssetsInfo(avatarInfos, gender) {
//    const filter = (names, index, letter) => {
//    let filteredNames = names.filter(
//      function(word) {
//        return word.charAt(index) === letter || word.charAt(index) === 'n';
//      });
//       return filteredNames;
//    }

//   // <gender>_:<color>;_<type>_<id>.png
//   return (
//     {
//       bases: filter(avatarInfos.data('bases'), 0, gender),
//       baseColors: filter(avatarInfos.data('basecolors'), 0, gender),
//       eyes: filter(avatarInfos.data('eyes'), 0, gender),
//       eyeColors: filter(avatarInfos.data('eyecolors'), 0, gender),
//       hairs: filter(avatarInfos.data('hairs'), 0, gender),
//       hairColors: filter(avatarInfos.data('haircolors'), 0, gender),
//       mouths: filter(avatarInfos.data('mouths'), 0, gender),
//       eyebrows: filter(avatarInfos.data('eyebrows'), 0, gender),
//       eyebrowColors: filter(avatarInfos.data('eyebrowcolors'), 0, gender),
//       noses: filter(avatarInfos.data('noses'), 0, gender),
//       clothes: filter(avatarInfos.data('clothes'), 0, gender),
//       acessories: filter(avatarInfos.data('acessories'), 0, gender),
//       acessoryColors: filter(avatarInfos.data('acessorycolors'), 0, gender)
//     }
//   );
// }
