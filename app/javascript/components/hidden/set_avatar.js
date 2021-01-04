import $ from 'jquery';

const setAvatar = () => {
    window.onload = function () {
   let imgEle1 = document.getElementById("face");
   let imgEle2 = document.getElementById("hair");
   let imgEle3 = document.getElementById("mouth");
   let imgEle4 = document.getElementById("eyes");
   let imgEle5 = document.getElementById("eyebrows");
   let imgEle6 = document.getElementById("nose");
   let resEle = document.querySelector(".result");
   var context = resEle.getContext("2d");
   resEle.width = imgEle1.width;
   resEle.height = imgEle1.height;
   context.drawImage(imgEle1, 0, 0);
   context.drawImage(imgEle2, 0, 0);
   context.drawImage(imgEle3, 0, 0);
   context.drawImage(imgEle4, 0, 0);
   context.drawImage(imgEle5, 0, 0);
   context.drawImage(imgEle6, 0, 0);
   var data = resEle.toDataURL('image/png');
 }
}

export { setAvatar };
