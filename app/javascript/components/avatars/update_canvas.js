import { initializeLayers } from './update_layers';

class Main {
  constructor(canvas, ctx, elements = []) {
    this.element = canvas;
    this.ctx = ctx;
    this.avElements = elements;
    this.okElements = 0;
  }

  layerIsReady() {
    this.checkReadyness();
    if (this.avElements.length <= this.okElements) {
      this.render();
    }
  }

  checkReadyness() {
    this.okElements = 0;
    const that = this;
    this.avElements.forEach((element) => {
      if (element.ready) { that.okElements++ };
    })
  }

  render() {
    this.avElements.forEach((element) => {
      this.ctx.drawImage(element.canvas.layer, 0, 0);
    })
    this.okElements = 0;
  }

}


export function initCanvas(dom, avatar) {
  const context = dom.masterLayer.getContext("2d");
  dom.masterLayer.width = dom.masterLayer.height = 144;
  const mainCanvas = new Main(dom.masterLayer, context)
  const layers = initializeLayers(avatar, mainCanvas)
  mainCanvas.avElements.push(layers.skin, layers.eyes, layers.eyebrows, layers.hair)

  layers.skin.loadImages();
  layers.eyes.loadImages();
  layers.eyebrows.loadImages();
  layers.hair.loadImages();
}


export function initializeCanvas(dom, assets, index) {
  const context          = dom.masterLayer.getContext("2d");
  dom.masterLayer.width  = dom.imgBase.width;
  dom.masterLayer.height = dom.imgBase.height;
  const layers = initializeLayers(dom, context, assets, index);
  context.drawImage(layers.base.info.layer, 0, 0);
  context.drawImage(layers.eyes.info.layer, 0, 0);
  context.drawImage(layers.hair.info.layer, 0, 0);
  context.drawImage(layers.eyebrows.info.layer, 0, 0);
  context.drawImage(layers.acessory.info.layer, 0, 0);
  context.drawImage(layers.clothe.info.layer, 0, 0);
  return {
    layers,
    context
  }
}

export function updateCanvas(dom, context, layers) {
  // layers.base.draw();
  // context.drawImage(layers.base.info.layer, 0, 0);
  // layers.eyes.draw();
  // context.drawImage(layers.eyes.info.layer, 0, 0);
  // layers.hair.draw();
  // context.drawImage(layers.hair._info.layer, 0, 0);
  // layers.eyebrows.draw();
  // context.drawImage(layers.eyebrows.info.layer, 0, 0);
  // layers.acessory.draw();
  // context.drawImage(layers.acessory.info.layer, 0, 0);
  // layers.clothe.draw();
  // context.drawImage(layers.clothe.info.layer, 0, 0);
  //context = dom.masterLayer.getContext('2d');
  context.drawImage(layers.base.info.layer, 0, 0);
  context.drawImage(layers.eyes.info.layer, 0, 0);
  context.drawImage(layers.eyebrows.info.layer, 0, 0);
  context.drawImage(layers.hair.info.layer, 0, 0);
  context.drawImage(layers.acessory.info.layer, 0, 0);
  context.drawImage(layers.clothe.info.layer, 0, 0);
}
