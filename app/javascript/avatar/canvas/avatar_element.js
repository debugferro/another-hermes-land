function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export default class AvatarElement {
  constructor(canvas, assets, mainCanvas, colors, skin = null) {
    this.canvas = canvas
    this.assets = assets
    this.main = mainCanvas
    this.assetsUrls = [];
    this.componentUrls = [];
    this.assetColors = [];
    this.componentColors = [];
    this.assetImgs = [];
    this.componentImgs = [];
    this.okImgs = 0;
    this.ready = false;
    this.paitingType = null;
    this.colors = colors;
    this.skin = skin;
  }

  init() {
    // Init is kind of the controller of this class.
    this.resolveUrls();
    this.resolveColors();
    if (this.assetsUrls.length === 0) {
      this.ready = true;
      this.main.layerIsReady();
    }
    this.loadImages(this.assetsUrls, this.assetImgs);
    this.loadImages(this.componentUrls, this.componentImgs);
  }

  change(assets) {
    // Receive new assets. For it, it will reset some variables.
    this.assets = assets;
    this.assetsUrls = [];
    this.componentUrls = [];
    this.assetImgs = [];
    this.componentImgs = [];
    this.okImgs = 0;
    this.ready = false;
    this.canvas.ctx.clearRect(0, 0, this.canvas.layer.width, this.canvas.layer.height);
    this.init();
  }

  changeColor(type, hex, target = null) {
    // This is equivalent to this.change function, but for changing color only.
    // It will change the color of a specific component. The target variable is
    // an index variable, which is correspondant to the index of the color.
    // The index of the colors is equivalent to the index of the component.
    this.ready = false;
    if (type === 'components') {
      this.componentColors[target] = hex;
    } else if (type === 'base') {
      this.assetColors[0] = hex;
    }
    this.paitingType = type;
    this.canvas.ctx.clearRect(0, 0, this.canvas.layer.width, this.canvas.layer.height);
    this.drawToColor();
  }

  resolveUrls() {
    // Iterate over the asset's objects and save it's image URL whether it's
    // the img for the base or whether it's a component of the base
    this.assets.forEach((asset) => {
      if (asset) {
        this.assetsUrls.push(asset.base);
        if (asset.components) {
          asset.components.forEach((component) => {
            this.componentUrls.push(component)
          });
        }
      }
    });
  }

  resolveColors() {
    // Verify if the colors array matches the number of base and components
    // If not, it will insert a default color hex so it can be changed.
    // if (this.assetColors.length === 0 && this.colors > 0) {
    //   const c = this.colors.shift();
    //   this.assetColors.push(c);
    // }
    // if(this.assets[0].category === "mouth") {

    // }
    if (this.skin && this.assets[0].skintonalized) {
      this.assetColors.push(this.skin.assetColors[0]);
    }
    while (this.assetColors.length <= this.assetsUrls.length) {
      if (this.colors.length !== 0) {
        this.assetColors.push(this.colors.shift());
      } else {
        this.assetColors.push('#000000');
      }
    }
    while (this.componentColors.length < this.componentUrls.length) {
      if (this.colors.length !== 0) {
        this.componentColors.push(this.colors.shift());
      } else {
        this.componentColors.push('#000000');
      }
    }
  }

  loadImages(urlList, imgList) {
    // It will create an IMG for the target asset and will call this.load onload.
    for (let i = 0; i < urlList.length; i += 1) {
      const img = new Image();
      imgList.push(img);
      img.onload = this.load.bind(this);
      img.src = `/avatar/${urlList[i]}`;
    }
  }

  load() {
    // It will register that an image was loaded. When all the images finished loading,
    // it will call this.drawToColor to start filling the canvas.
    this.okImgs += 1;
    if (this.okImgs >= this.assetsUrls.length + this.componentUrls.length) {
      this.drawToColor();
    }
  }

  drawToColor() {
    // It will draw each image on a separete canvas to be
    // fullfilled with color,and all those in the
    // asset canvas, and finally it will call the main canvas to state that
    // it is ready to be drawn for the final result.
    for (let i = 0; i < this.assetImgs.length; i += 1) {
      const layer = this.drawComponent(this.assetImgs[i]);
      const assetColor = hexToRgb(this.assetColors[0]);
      this.changeTargetColor(layer, assetColor.r, assetColor.g, assetColor.b);
      this.canvas.ctx.drawImage(layer, 0, 0);
    }

    for (let t = 0; t < this.componentImgs.length; t += 1) {
      const layer = this.drawComponent(this.componentImgs[t]);
      const compColor = hexToRgb(this.componentColors[t]);
      this.changeTargetColor(layer, compColor.r, compColor.g, compColor.b);
      this.canvas.ctx.drawImage(layer, 0, 0);
    }
    this.ready = true;
    this.main.layerIsReady();
  }

  changeTargetColor(target, r, g, b) {
    // This will change every pixel color summing what it needs to achieve the
    // new value inputted by the user.
    const ctx = target.getContext("2d");
    const imageData = ctx.getImageData(0, 0, this.canvas.layer.width, this.canvas.layer.height);
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
      const newR = !r ? 0 : r - data[i] / 1.5;
      const newG = !g ? 0 : g - data[i + 1] / 1.5;
      const newB = !b ? 0 : b - data[i + 2] / 1.5;
      data[i]     += newR;
      data[i + 1] += newG;
      data[i + 2] += newB;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  drawComponent(img) {
    // It will draw an IMG in a canvas
    const layer = document.createElement('canvas');
    const ctx = layer.getContext("2d");
    ctx.width = this.canvas.layer.width
    ctx.height = this.canvas.layer.height
    ctx.drawImage(img, 0, 0);
    return layer;
  }
}
