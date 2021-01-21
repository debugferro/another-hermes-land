// import { hexToRgb } from './change_asset';

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

class AvatarElement {
  constructor(canvas, assets, mainCanvas, colors, skin = null) {
    this.canvas = canvas
    this.assets = assets
    this.main = mainCanvas
    this.assetsUrls = [];
    this.componentUrls = [];
    this.assetColors = [];
    this.componentColors = [];
    this.assetImgs = [];
    this.componentImgs = [];
    this.okImgs = 0;
    this.ready = false;
    this.paitingType = null;
    this.colors = colors;
    this.skin = skin;
  }

  init() {
    this.resolveUrls();
    this.resolveColors();
    if  (this.assetsUrls.length === 0) {
      this.ready = true;
      this.main.layerIsReady();
    }
    this.loadImages(this.assetsUrls, this.assetImgs);
    this.loadImages(this.componentUrls, this.componentImgs);
  }

  resolveColors() {
    if (this.assetColors.length === 0) {
      const c = this.colors.shift();
      this.assetColors.push(c);
    }
    while (this.componentColors.length < this.componentUrls.length) {
      if (this.colors.length != 0){
        this.componentColors.push(this.colors.shift());
      } else {
        this.componentColors.push('#000000');
      }
    }
  }

  resolveUrls() {
    this.assets.forEach((asset) => {
      if (asset) {
        this.assetsUrls.push(asset.base);
        if (asset.components) {
          asset.components.forEach((component) => {
            this.componentUrls.push(component)
          })
        }
      }
    })
  }

  change(assets) {
    this.assets = assets;
    this.assetsUrls = [];
    this.componentUrls = [];
    this.assetImgs = [];
    this.componentImgs = [];
    this.okImgs = 0;
    this.ready = false;
    this.canvas.ctx.clearRect(0, 0, this.canvas.layer.width, this.canvas.layer.height);
    this.init();
  }


  changeColor(type, hex, target = null) {
    // components, 2, hex
    // base, hex
    this.ready = false;
    // this.okImgs = 0;
    // this.paitingMode = true;
    // this.componentImgs = [];
    // this.assetImgs = [];
    if (type === 'components') {
      this.componentColors[target] = hex;
    } else if (type === 'base') {
      this.assetColors[0] = hex;
    }
    this.paitingType = type;
    this.canvas.ctx.clearRect(0, 0, this.canvas.layer.width, this.canvas.layer.height);
    this.drawToColor();
  }


  loadImages(urlList, imgList) {
    for (let i = 0; i < urlList.length; i++) {
      let img = new Image();
      imgList.push(img);
      img.onload = this.load.bind(this);
      img.src = `/avatar/${urlList[i]}`
    }
  }

  load() {
    this.okImgs += 1;
    if (this.okImgs >= this.assetsUrls.length + this.componentUrls.length) {
      this.drawToColor();
    }
  }


  drawToColor() {
    for(let i = 0; i < this.assetImgs.length; i++) {
      let layer = this.drawComponent(this.assetImgs[i]);
      // if (this.paitingType === 'base') {
        const assetColor = hexToRgb(this.assetColors[0]);
        this.changeTargetColor(layer, assetColor.r, assetColor.g, assetColor.b)
      // }
      this.canvas.ctx.drawImage(layer, 0, 0);
    }

    for(let t = 0; t < this.componentImgs.length; t++) {
      let layer = this.drawComponent(this.componentImgs[t]);
      // if (this.paitingType === 'components') {
        const compColor = hexToRgb(this.componentColors[t]);
        this.changeTargetColor(layer, compColor.r, compColor.g, compColor.b);
      // }
      this.canvas.ctx.drawImage(layer, 0, 0);
    }
    this.ready = true;
    this.main.layerIsReady();
  }

  changeTargetColor(target, r, g, b) {
    const ctx = target.getContext("2d");
    const imageData = ctx.getImageData(0, 0, this.canvas.layer.width, this.canvas.layer.height); // Recebo array com a cor dos pixels
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
      // if (data[i] > 120 || data[i + 1] > 110 || data[i + 2] > 100) {
      let newR = !r ? 0 : r - data[i]/1.5;  // Vejo a diferença entre o atual valor do pixel
      let newG = !g ? 0 : g - data[i + 1]/1.5;  // e o valor que ele tem que chegar pra nova cor
      let newB = !b ? 0 : b - data[i + 2]/1.5; // divido por 1.5 pra não estourar mt a cor
      data[i]     += newR;
      data[i + 1] += newG;  // Atribuo os novos valores somando o necessário que faltava
      data[i + 2] += newB;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  drawComponent(img) {
    let layer = document.createElement('canvas');
    const ctx = layer.getContext("2d");
    ctx.width = this.canvas.layer.width
    ctx.height = this.canvas.layer.height
    ctx.drawImage(img, 0, 0);
    return layer;
  }
/*  draw() {
    this.assetImgs.forEach((img) => {
      let layer = this.drawComponent(img);
      this.canvas.ctx.drawImage(layer, 0, 0);
    })
    this.componentImgs.forEach((img) => {
      let layer = this.drawComponent(img);
      this.canvas.ctx.drawImage(layer, 0, 0);
    })
    this.ready = true;
    this.main.layerIsReady();
  }*/
}

function createLayer(mainCanvas) {
  let layer = document.createElement('canvas');
  const ctx = layer.getContext("2d");
  ctx.width = mainCanvas.element.width;
  ctx.height = mainCanvas.element.height;
  return {
    layer: layer,
    ctx: ctx
  }
}

export function initializeLayers(avatar, mainCanvas) {
  const skinCanvas = createLayer(mainCanvas);
  const mouthCanvas = createLayer(mainCanvas);
  const eyesCanvas = createLayer(mainCanvas);
  const eyebrowCanvas = createLayer(mainCanvas);
  const hairCanvas = createLayer(mainCanvas);
  const acessoryCanvas = createLayer(mainCanvas);
  const clotheCanvas = createLayer(mainCanvas);

  const skinEl = new AvatarElement(skinCanvas, [avatar.face, avatar.nose], mainCanvas, avatar.colorOf.skin);
  const mouthEl = new AvatarElement(mouthCanvas, [avatar.mouth], mainCanvas, avatar.colorOf.mouth, skinEl);
  const eyesEl = new AvatarElement(eyesCanvas, [avatar.eyes], mainCanvas, avatar.colorOf.eyes);
  const eyebrowsEl = new AvatarElement(eyebrowCanvas, [avatar.eyebrows], mainCanvas, avatar.colorOf.eyebrows);
  const hairEl = new AvatarElement(hairCanvas, [avatar.hair], mainCanvas, avatar.colorOf.hair);
  const acessoryEl = new AvatarElement(acessoryCanvas, [avatar.acessories], mainCanvas, avatar.colorOf.acessory);
  const clotheEl = new AvatarElement(clotheCanvas, [avatar.clothes], mainCanvas, avatar.colorOf.clothe);

  return {
      skin: skinEl,
      mouth: mouthEl,
      eyes: eyesEl,
      eyebrows: eyebrowsEl,
      hair: hairEl,
      acessory: acessoryEl,
      clothe: clotheEl
  }
}




// Posso ter mais de uma cor, variando de acordo com a quantidade de componenter
// A mudança de cor ocorre via o número do index da array de cores
// Como posso manter o array de cores do tamanho do número de componentes e
// manter as cores conforme haja a mudança de assets?
// Quando inicializar preciso receber a array de cores





















// class Layer {
//   constructor(info, ChosenAssets, color = '#000000') {
//     this.info = info;
//     this.assets = ChosenAssets;
//     this.color = typeof(color) === "string" ? hexToRgb(color) : color;
//   }


//   draw() {
//     this.info.ctx.clearRect(0, 0, this.info.layer.width, this.info.layer.height);
//     this.info.ctx = this.info.layer.getContext('2d');
//     this.assets.forEach((asset) => {
//       this.info.ctx.drawImage(asset, 0, 0);
//     })
//     this.updateColor();
//   }

//   updateColor() {
//     if (this.color.r != 0 || this.color.g != 0 || this.color.b != 0) {
//       const imageData = this.info.ctx.getImageData(0, 0, this.info.layer.width, this.info.layer.height); // Recebo array com a cor dos pixels
//       const data = imageData.data
//       const divisor = 1.5;
//       for (let i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
//       // if (data[i] > 152 || data[i + 1] > 116 && data[i + 2] > 50) {
//         let newR = !this.color.r ? 0 : this.color.r - data[i]/divisor;  // Vejo a diferença entre o atual valor do pixel
//         let newG = !this.color.g ? 0 : this.color.g - data[i + 1]/divisor;  // e o valor que ele tem que chegar pra nova cor
//         let newB = !this.color.b ? 0 : this.color.b - data[i + 2]/divisor; // divido por 1.5 pra não estourar mt a cor
//         data[i]     += newR;
//         data[i + 1] += newG;  // Atribuo os novos valores somando o necessário que faltava
//         data[i + 2] += newB;
//     // }
//       }
//       this.info.ctx.putImageData(imageData, 0, 0);
//     }
//   }

// }

// class SkinLayer {
//   constructor(info, face, nose, mouth, color = '#000000') {
//     this.info = info;
//     this.face = face;
//     this.nose = nose;
//     this.mouth = mouth;
//     this.components = [face, nose, mouth];
//     this.color = hexToRgb(color);
//   }

//   draw(){
//     this.info.ctx.clearRect(0, 0, this.info.layer.width, this.info.layer.height)
//     this.info.ctx = this.info.layer.getContext('2d');
//     this.components.forEach((component) => {
//       component.color = this.color
//       component.draw();
//     })
//     this.updateLayers();
//   }

//   updateLayers() {
//     this.components.forEach((component) => {
//       this.info.ctx.drawImage(component.info.layer, 0, 0);
//       console.log("Update layers is happening")
//     })
//   }

//   updateColor() {
//     if (this.color.r, this.color.g, this.color.b != 0) {
//       const imageData = this.info.ctx.getImageData(0, 0, this.info.layer.width, this.info.layer.height); // Recebo array com a cor dos pixels
//       const data = imageData.data
//       const divisor = 1.5;
//       for (let i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
//         let newR = !this.color.r ? 0 : this.color.r - data[i]/divisor;  // Vejo a diferença entre o atual valor do pixel
//         let newG = !this.color.g ? 0 : this.color.g - data[i + 1]/divisor;  // e o valor que ele tem que chegar pra nova cor
//         let newB = !this.color.b ? 0 : this.color.b - data[i + 2]/divisor; // divido por 1.5 pra não estourar mt a cor
//         data[i]     += newR;
//         data[i + 1] += newG;  // Atribuo os novos valores somando o necessário que faltava
//         data[i + 2] += newB;
//       }
//       this.info.ctx.putImageData(imageData, 0, 0);
//     }
//     this.info.ctx = this.info.layer.getContext('2d');
//   }

//   modifyComponent(component) {
//     switch (component) {
//       case 'face':
//         this.face.draw();
//         break;
//       case 'nose':
//         this.nose.draw();
//         break;
//       case 'mouth':
//         this.mouth.draw();
//         break;
//       default:
//         console.log('Error: component not existant')
//     }
//   }

// }
