import findColors from './find_colors';

// class AssetForSkin {
//   constructor(assets) {
//     this.assets = assets;
//   }

//   redefineAssets(assets, pattern) {
//     this.assets = findColors(assets, pattern);
//   }
// }

class AssetsForSkin {
  constructor(assets, idPattern) {
    this.noses = findColors(assets.noses, idPattern);
    this.mouths = findColors(assets.mouths, idPattern);
    this.eyes = findColors(assets.eyes, idPattern);
  }

  redefineAssets(assets, idPattern) {
    this.noses = findColors(assets.noses, idPattern);
    this.mouths = findColors(assets.mouths, idPattern);
    this.eyes = findColors(assets.eyes, idPattern);
  }
}

export function resolveIdPattern(currentFile) {
  let startIndex = currentFile.lastIndexOf(":") + 1;
  let endIndex   = currentFile.lastIndexOf(";");
  let idPattern  = currentFile.substring(startIndex, endIndex);
  return idPattern;
}

export function initializeAssetsForColor(currentFile, assets) {
  let idPattern = resolveIdPattern(currentFile);
  return new AssetsForSkin(assets, idPattern);
}

/*{
    noses: new AssetForSkin(findColors(assets.noses, idPattern)),
    mouths: new AssetForSkin(findColors(assets.mouths, idPattern)),
    eyes: new AssetForSkin(findColors(assets.eyes, idPattern))
  }*/
