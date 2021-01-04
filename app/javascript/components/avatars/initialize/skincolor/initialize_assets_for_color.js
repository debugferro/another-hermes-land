import findColors from './find_colors';

export default function initializeAssetsForColor(currentFile, assets) {
  let startIndex = currentFile.lastIndexOf(":") + 1;
  let endIndex   = currentFile.lastIndexOf(";");
  let idPattern  = currentFile.substring(startIndex, endIndex)
  return {
    filteredNoses: findColors(assets.noses, idPattern),
    filteredMouths: findColors(assets.mouths, idPattern),
    filteredEyes: findColors(assets.eyes, idPattern)
  }
}
