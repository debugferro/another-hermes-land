import { hexToRgb } from './change_asset';

class Layer {
  constructor(info, ChosenAssets, color = '#000000') {
    this.info = info;
    this.assets = ChosenAssets;
    this.color = typeof(color) === "string" ? hexToRgb(color) : color;
  }



  draw() {
    this.info.ctx.clearRect(0, 0, this.info.layer.width, this.info.layer.height);
    this.info.ctx = this.info.layer.getContext('2d');
    this.assets.forEach((asset) => {
      this.info.ctx.drawImage(asset, 0, 0);
    })
    this.updateColor();
    // console.log(this._info.ctx)
    // if (this._color) {
    //   this.constructor.color(this._info, this._color);
    // }
  }

  updateColor() {
    console.log(this.color);
    if (this.color.r != 0 || this.color.g != 0 || this.color.b != 0) {
      const imageData = this.info.ctx.getImageData(0, 0, this.info.layer.width, this.info.layer.height); // Recebo array com a cor dos pixels
      const data = imageData.data
      const divisor = 1.5;
      for (let i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
      // if (data[i] > 152 || data[i + 1] > 116 && data[i + 2] > 50) {
        let newR = !this.color.r ? 0 : this.color.r - data[i]/divisor;  // Vejo a diferença entre o atual valor do pixel
        let newG = !this.color.g ? 0 : this.color.g - data[i + 1]/divisor;  // e o valor que ele tem que chegar pra nova cor
        let newB = !this.color.b ? 0 : this.color.b - data[i + 2]/divisor; // divido por 1.5 pra não estourar mt a cor
        data[i]     += newR;
        data[i + 1] += newG;  // Atribuo os novos valores somando o necessário que faltava
        data[i + 2] += newB;
    // }
      }
      this.info.ctx.putImageData(imageData, 0, 0);
    }
  }

}

class SkinLayer {
  constructor(info, face, nose, mouth, color = '#000000') {
    this.info = info;
    this.face = face;
    this.nose = nose;
    this.mouth = mouth;
    this.components = [face, nose, mouth];
    this.color = hexToRgb(color);
  }

  draw(){
    this.info.ctx.clearRect(0, 0, this.info.layer.width, this.info.layer.height)
    this.info.ctx = this.info.layer.getContext('2d');
    this.components.forEach((component) => {
      component.color = this.color;
      component.draw();
    })
    this.updateLayers();
  }

  updateLayers() {
    this.components.forEach((component) => {
      this.info.ctx.drawImage(component.info.layer, 0, 0);
    })
  }

  updateColor() {
    if (this.color.r, this.color.g, this.color.b != 0) {
      const imageData = this.info.ctx.getImageData(0, 0, this.info.layer.width, this.info.layer.height); // Recebo array com a cor dos pixels
      const data = imageData.data
      const divisor = 1.5;
      for (let i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
        let newR = !this.color.r ? 0 : this.color.r - data[i]/divisor;  // Vejo a diferença entre o atual valor do pixel
        let newG = !this.color.g ? 0 : this.color.g - data[i + 1]/divisor;  // e o valor que ele tem que chegar pra nova cor
        let newB = !this.color.b ? 0 : this.color.b - data[i + 2]/divisor; // divido por 1.5 pra não estourar mt a cor
        data[i]     += newR;
        data[i + 1] += newG;  // Atribuo os novos valores somando o necessário que faltava
        data[i + 2] += newB;
      }
      this.info.ctx.putImageData(imageData, 0, 0);
    }
    this.info.ctx = this.info.layer.getContext('2d');
  }

  modifyComponent(component) {
    switch (component) {
      case 'face':
        this.face.draw();
        break;
      case 'nose':
        this.nose.draw();
        break;
      case 'mouth':
        this.mouth.draw();
        break;
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
