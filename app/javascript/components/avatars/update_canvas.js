import { initializeLayers } from './update_layers';

export function initializeCanvas(dom) {
  const context          = dom.masterLayer.getContext("2d");
  dom.masterLayer.width  = dom.imgBase.width;
  dom.masterLayer.height = dom.imgBase.height;
  const layers = initializeLayers(dom, context);
  context.drawImage(layers.base.info.layer, 0, 0);
  context.drawImage(layers.eyes._info.layer, 0, 0);
  context.drawImage(layers.hair._info.layer, 0, 0);
  context.drawImage(layers.eyebrows._info.layer, 0, 0);
  context.drawImage(layers.acessory._info.layer, 0, 0);
  context.drawImage(layers.clothe._info.layer, 0, 0);
  return {
    layers,
    context
  }
}

export function updateCanvas(context, layers) {
  // layers.base.updateLayers();
  // context.drawImage(layers.base.info.layer, 0, 0);
  // layers.eyes.draw();
  // context.drawImage(layers.eyes.info.layer, 0, 0);
  layers.hair.draw();
  context.drawImage(layers.hair._info.layer, 0, 0);
  console.log(`hair now is:`)
  console.log(layers.hair)
  // layers.eyebrows.draw();
  // context.drawImage(layers.eyebrows.info.layer, 0, 0);
  // layers.acessory.draw();
  // context.drawImage(layers.acessory.info.layer, 0, 0);
  // layers.clothe.draw();
  // context.drawImage(layers.clothe.info.layer, 0, 0);
}
