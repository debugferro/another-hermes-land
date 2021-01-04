import $ from 'jquery';

  let imgEle1;
  let imgEle2;
  let imgEle3;
  let imgEle4;
  let imgEle5;
  let imgEle6;
  let resEle;
  var context;

const createAvatar = () => {
  BtnHair.addEventListener("click", () => {
    grabElements();
    imgEle2.src = "/avatar/blond_hair_2.png"
    grabElements();
    updateCanvas();
  });

};



// document.addEventListener("DOMContentLoaded", uploadfunc);

export { createAvatar };
