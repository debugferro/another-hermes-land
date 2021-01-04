export default function grabElements() {
  return(
    {
      imgBase: document.getElementById("face"),
      imgHair: document.getElementById("hair"),
      imgMouth: document.getElementById("mouth"),
      imgEyes: document.getElementById("eyes"),
      imgEyebrows: document.getElementById("eyebrows"),
      imgNose: document.getElementById("nose"),
      imgCloth: document.getElementById("cloth") ?? '',
      imgAcessory: document.getElementById("acessory") ?? '',
      resAvatar: document.querySelector(".result")
    }
  );
}
