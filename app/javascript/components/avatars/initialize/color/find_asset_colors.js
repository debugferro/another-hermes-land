export default function findAssetColors(assetColors, idPattern) {
  let selected = [];
  assetColors.forEach((assetColor) => {
    let startIndex = assetColor.lastIndexOf("_") + 1;
    let endIndex = assetColor.lastIndexOf(".");
    let assetIdPattern = assetColor.substring(startIndex, endIndex)
    if (assetIdPattern == idPattern) {
      selected.push(assetColor)
      }
  })
  return selected;
}
