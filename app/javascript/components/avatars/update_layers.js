import { hexToRgb } from './change_asset';

class AvatarElement {
  constructor(canvas, assets, mainCanvas) {
    this.canvas = canvas
    this.assets = assets
    this.main = mainCanvas
    this.assetsUrls = [];
    this.imgsElements = [];
    this.okImgs = 0;
    this.ready = false;
  }

  resolveUrls() {
    this.assets.forEach((asset) => {
      if (asset) {
        this.assetsUrls.push(asset.base);
        if (asset.components) {
          asset.components.forEach((component) => {
            this.assetsUrls.push(component)
          })
        }
      }
    })
  }

  change(assets) {
    this.assets = assets;
    this.assetsUrls = [];
    this.imgsElements = [];
    this.okImgs = 0;
    this.ready = false;
    this.canvas.ctx.clearRect(0, 0, this.canvas.ctx.width, this.canvas.ctx.height);
    this.loadImages();
  }

  loadImages() {
    this.resolveUrls();
    for (let i = 0; i < this.assetsUrls.length; i++) {
      let img = new Image();
      this.imgsElements.push(img);
      img.onload = this.load.bind(this);
      img.src = `/avatar/${this.assetsUrls[i]}`
    }
    if  (this.assetsUrls.length === 0) {
      this.ready = true;
      this.main.layerIsReady();
    }
  }

  load() {
    this.okImgs += 1;
    if (this.okImgs >= this.assetsUrls.length) {
      this.draw();
    }
  }

  draw() {
    this.imgsElements.forEach((img) => {
      this.canvas.ctx.drawImage(img, 0, 0);
    })
    this.ready = true;
    this.main.layerIsReady();
  }
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
  const eyesCanvas = createLayer(mainCanvas);
  const eyebrowCanvas = createLayer(mainCanvas);
  const hairCanvas = createLayer(mainCanvas);
  const acessoryCanvas = createLayer(mainCanvas);
  const clotheCanvas = createLayer(mainCanvas);

  const skinEl = new AvatarElement(skinCanvas, [avatar.face, avatar.nose, avatar.mouth], mainCanvas);
  const eyesEl = new AvatarElement(eyesCanvas, [avatar.eyes], mainCanvas);
  const eyebrowsEl = new AvatarElement(eyebrowCanvas, [avatar.eyebrows], mainCanvas);
  const hairEl = new AvatarElement(hairCanvas, [avatar.hair], mainCanvas);
  const acessoryEl = new AvatarElement(acessoryCanvas, [avatar.acessories], mainCanvas);
  const clotheEl = new AvatarElement(clotheCanvas, [avatar.clothes], mainCanvas);

  return {
      skin: skinEl,
      eyes: eyesEl,
      eyebrows: eyebrowsEl,
      hair: hairEl,
      acessory: acessoryEl,
      clothe: clotheEl
  }
}


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
