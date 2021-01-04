export default function findColors(assetColors, idPattern) {
  let selected = [];
  assetColors.forEach((assetColor) => {
    let firstIndex = assetColor.lastIndexOf(":") + 1;
    let lastIndex = assetColor.lastIndexOf(";");
    if (assetColor.substring(firstIndex, lastIndex) == idPattern || assetColor.substring(firstIndex, lastIndex) == "neutral") {
      selected.push(assetColor)
      }
    })
  return selected;
}
