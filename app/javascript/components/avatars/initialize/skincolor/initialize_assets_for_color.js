import findColors from './find_colors';

export default function initializeAssetsForColor(currentFile, assets) {
  let startIndex = currentFile.lastIndexOf(":") + 1;
  let endIndex   = currentFile.lastIndexOf(";");
  let idPattern  = currentFile.substring(startIndex, endIndex)
  return {
    noses: findColors(assets.noses, idPattern),
    mouths: findColors(assets.mouths, idPattern),
    eyes: findColors(assets.eyes, idPattern)
  }
}
