class Layer {
  constructor(info, ChosenAssets) {
    this._info = info;
    this._assets = ChosenAssets;
  }

  set assets(ChosenAssets) {
    this._assets = ChosenAssets;
  }

  draw() {
    this._info.ctx.clearRect(0, 0, this._info.layer.width, this._info.layer.height);
    //this._info.ctx = this._info.layer.getContext('2d');
    this._assets.forEach((asset) => {
      this._info.ctx.drawImage(asset, 0, 0);
    })
    // console.log(this._info.ctx)
  }
}

class SkinLayer {
  constructor(info, face, nose, mouth) {
    this.info = info;
    this.face = face;
    this.nose = nose;
    this.mouth = mouth;
    this.components = [face, nose, mouth];
  }

  draw(){
    this.components.forEach((component) => {
      component.draw();
    })
  }

  updateLayers() {
    this.components.forEach((component) => {
      this.info.ctx.drawImage(component.info.layer, 0, 0);
    })
  }

  modifyComponent(component, newAssets) {
    switch (component) {
      case 'face':
        this.face.modify(newAssets);
        this.face.draw();
        break;
      case 'nose':
        this.nose.modify(newAssets);
        this.nose.draw();
        break;
      case 'mouth':
        this.mouth.modify(newAssets);
        this.mouth.draw();
      default:
        console.log('Error: component not existant')
    }
  }

}


function createLayer(image, mainCtx, targetLayer = null) {
  let layer = document.createElement('canvas');
  const ctx = layer.getContext("2d");
  ctx.width = mainCtx.width;
  ctx.height = mainCtx.height;
  ctx.drawImage(image, 0, 0);
  if (targetLayer) {
    targetLayer.drawImage(layer, 0, 0)
  }
  return {
    layer: layer,
    ctx: ctx,
    mainCtx: targetLayer
  }
}

export function initializeLayers(dom, mainCtx) {
  const skinGroup = document.createElement('canvas');
  const skinGroupCtx = skinGroup.getContext("2d");

  const faceCtx = createLayer(dom.imgBase, mainCtx, skinGroupCtx);

  const face = new Layer(faceCtx, [dom.imgBase]);

  const noseCtx = createLayer(dom.imgNose, mainCtx, skinGroupCtx);
  const nose = new Layer(noseCtx, [dom.imgNose]);

  const mouthCtx = createLayer(dom.imgMouth, mainCtx, skinGroupCtx);
  const mouth = new Layer(mouthCtx, [dom.imgMouth]);

  const eyesCtx = createLayer(dom.imgEyes, mainCtx);
  const hairCtx = createLayer(dom.imgHair, mainCtx);
  const eyebrowsCtx = createLayer(dom.imgEyebrows, mainCtx);
  const acessoryCtx = createLayer(dom.imgAcessory, mainCtx);
  const clothesCtx = createLayer(dom.imgCloth, mainCtx);

  return {
    base: new SkinLayer({layer: skinGroup, ctx: skinGroupCtx}, face, nose, mouth),
    face: face,
    nose: nose,
    mouth: mouth,
    eyes: new Layer(eyesCtx, [dom.imgEyes]),
    hair: new Layer(hairCtx, [dom.imgHair]),
    eyebrows: new Layer(eyebrowsCtx, [dom.imgEyebrows]),
    acessory: new Layer(acessoryCtx, [dom.imgAcessory]),
    clothe: new Layer(clothesCtx, [dom.imgCloth])
  }
}

/*  let skinLayer = document.createElement('canvas');
  const skinCtx = skinLayer.getContext("2d");
  skinCtx.width = mainCtx.width;
  skinCtx.height = mainCtx.height;
  skinCtx.drawImage(dom.imgBase, 0, 0);*/
/*  let noseLayer = document.createElement('canvas');
  const noseCtx = noseLayer.getContext("2d");
  noseCtx.width = mainCtx.width;
  noseCtx.height = mainCtx.height;
  noseCtx.drawImage(dom.imgNose, 0, 0);

  let noseLayer = document.createElement('canvas');
  const noseCtx = noseLayer.getContext("2d");
  noseCtx.width = mainCtx.width;
  noseCtx.height = mainCtx.height;
  noseCtx.drawImage(dom.imgNose, 0, 0);

  let eyesLayer = document.createElement('canvas');
  const eyesCtx = eyesLayer.getContext("2d");
  eyesCtx.width = mainCtx.width;
  eyesCtx.height = mainCtx.height;
  eyesCtx.drawImage(dom.imgEyes, 0, 0);

  let hairLayer = document.createElement('canvas');
  const hairCtx = hairLayer.getContext("2d");
  hairCtx.width = mainCtx.width;
  hairCtx.height = mainCtx.height;
  hairCtx.drawImage(dom.imgHair, 0, 0);
  hairCtx.drawImage(dom.imgEyebrows, 0, 0);

  let acessoryLayer = document.createElement('canvas');
  const acessoryCtx = acessoryLayer.getContext("2d");
  acessoryCtx.width = mainCtx.width;
  acessoryCtx.height = mainCtx.height;
  acessoryCtx.drawImage(dom.imgAcessory, 0, 0);*/
