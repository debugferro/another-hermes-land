export default function updateCanvas(dom) {
  console.log(dom);
  let context          = dom.resAvatar.getContext("2d");
  dom.resAvatar.width  = dom.imgBase.width;
  dom.resAvatar.height = dom.imgBase.height;
  context.drawImage(dom.imgBase, 0, 0);
  context.drawImage(dom.imgHair, 0, 0);
  context.drawImage(dom.imgMouth, 0, 0);
  context.drawImage(dom.imgEyes, 0, 0);
  context.drawImage(dom.imgEyebrows, 0, 0);
  context.drawImage(dom.imgNose, 0, 0);
  context.drawImage(dom.imgCloth, 0, 0);
  context.drawImage(dom.imgAcessory, 0, 0);
}
