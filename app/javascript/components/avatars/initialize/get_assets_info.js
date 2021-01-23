import $ from 'jquery';

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

export function setIndex(assets, avatar) {
  return {
    base: new assetIndex(0),
    hair: new assetIndex(assets.hairs.findIndex(assetObj => assetObj.id === avatar.hair.id)),
    eyes: new assetIndex(assets.eyes.findIndex(assetObj => assetObj.id === avatar.eyes.id)),
    mouth: new assetIndex(assets.mouths.findIndex(assetObj => assetObj.id === avatar.mouth.id)),
    eyebrows: new assetIndex(assets.eyebrows.findIndex(assetObj => assetObj.id === avatar.eyebrows.id)),
    nose: new assetIndex(assets.noses.findIndex(assetObj => assetObj.id === avatar.nose.id)),
    acessory: new assetIndex(assets.acessories.findIndex(assetObj => assetObj.id === avatar.acessory && avatar.acessory.id)),
    clothe: new assetIndex(assets.clothes.findIndex(assetObj => assetObj.id === avatar.clothe && avatar.clothe.id))
  }
}
