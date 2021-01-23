import AvatarElement from './avatar_element';

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

export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
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
  const acessoryEl = new AvatarElement(acessoryCanvas, [avatar.acessory], mainCanvas, avatar.colorOf.acessory);
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
