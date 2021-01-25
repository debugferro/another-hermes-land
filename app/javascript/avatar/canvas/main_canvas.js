export default class Main {
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
