import Main from '../canvas/main_canvas';
import AvatarElement from '../canvas/avatar_element';

export const INITIALIZE_CANVAS_LAYERS = "INITIALIZE_CANVAS_LAYERS";

function createLayer(mainCanvas) {
  const layer = document.createElement('canvas');
  const ctx = layer.getContext("2d");
  ctx.width = mainCanvas.element.width;
  ctx.height = mainCanvas.element.height;
  return {
    layer,
    ctx
  };
}

function initializeLayers(avatar, mainCanvas) {
  const skinCanvas = createLayer(mainCanvas);
  const mouthCanvas = createLayer(mainCanvas);
  const eyesCanvas = createLayer(mainCanvas);
  const eyebrowCanvas = createLayer(mainCanvas);
  const hairCanvas = createLayer(mainCanvas);
  const acessoryCanvas = createLayer(mainCanvas);
  const clotheCanvas = createLayer(mainCanvas);

  const skinEl = new AvatarElement(skinCanvas, [avatar.face, avatar.nose],
    mainCanvas, avatar.colorOf.skin);
  const mouthEl = new AvatarElement(mouthCanvas, [avatar.mouth],
    mainCanvas, avatar.colorOf.mouth, skinEl);
  const eyesEl = new AvatarElement(eyesCanvas, [avatar.eyes],
    mainCanvas, avatar.colorOf.eyes);
  const eyebrowsEl = new AvatarElement(eyebrowCanvas, [avatar.eyebrows],
    mainCanvas, avatar.colorOf.eyebrows);
  const hairEl = new AvatarElement(hairCanvas, [avatar.hair],
    mainCanvas, avatar.colorOf.hair);
  const acessoryEl = new AvatarElement(acessoryCanvas, [avatar.acessory],
    mainCanvas, avatar.colorOf.acessory);
  const clotheEl = new AvatarElement(clotheCanvas, [avatar.clothes],
    mainCanvas, avatar.colorOf.clothe);

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

export const initCanvas = (avatar, canvas) => {
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = 144;
  const mainCanvas = new Main(canvas, context);
  const layers = initializeLayers(avatar, mainCanvas);
  mainCanvas.avElements.push(layers.skin, layers.mouth, layers.eyes,
    layers.eyebrows, layers.hair, layers.acessory, layers.clothe);

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
    clothe: layers.clothe,
    main: mainCanvas
  };
};
