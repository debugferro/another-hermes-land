import findAssetColors from './find_asset_colors';

export default function initializeColorIndexes(currentAsset, assetColors) {
  let startIndex = currentAsset.lastIndexOf("_") + 1;
  let endIndex   = currentAsset.lastIndexOf(".");
  let idPattern  = currentAsset.substring(startIndex, endIndex)
  let selectedAssetColors = [];
  let selectedAssetsIndex;

  selectedAssetColors = findAssetColors(assetColors, idPattern);
  selectedAssetColors.push(currentAsset)
  selectedAssetsIndex = (selectedAssetColors.indexOf(currentAsset));
  return {
    index: selectedAssetsIndex,
    colors: selectedAssetColors
  };
}
