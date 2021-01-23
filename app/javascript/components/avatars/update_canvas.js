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
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
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
  mainCanvas.avElements.push(layers.skin, layers.mouth, layers.eyes, layers.eyebrows, layers.hair, layers.acessory, layers.clothe)

  layers.skin.init();
  layers.mouth.init();
  layers.eyes.init();
  layers.eyebrows.init();
  layers.hair.init();
  layers.acessory.init();
  layers.clothe.init();
  return {
    skin: layers.skin,
    mouth: layers.mouth,
    eyes: layers.eyes,
    eyebrows: layers.eyebrows,
    hair: layers.hair,
    acessory: layers.acessory,
    clothe: layers.clothe
  }
}
