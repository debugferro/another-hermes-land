const iterateBackOrForward = (array, index, direction) => {
    if(index > array.length - 1) { index = 0; }

    if (direction == 1){
      if(index == array.length - 1) {
        index = 0;
      }
      else
      {
        index = index + 1;
      }
      return {
        direction: index
      }
    } else {
      if(index == 0 || index < 0) {
        index = array.length - 1;
      } else {
        index = index - 1;
      }
      return {
        direction: index
      }
    }
  }

export function changeAsset(assets, movingDirection, assetIndex, layer, connections = null) {
  assetIndex.changeIndex(iterateBackOrForward(assets, assetIndex.index, movingDirection).direction);
  let currentAsset = assets[assetIndex.index];
  if (currentAsset.skintonalized && currentAsset.category === 'mouth') {
    layer.assetColors[0] = layer.skin.assetColors[0];
  } else if (!currentAsset.skintonalized && currentAsset.category === 'mouth') {
    layer.assetColors[0] = '#000000';
  }
  if (connections) {
    connections.push(currentAsset)
    layer.change(connections)
  } else {
    layer.change([currentAsset])
  }
}

// ----------------------------------------------------------------------------

export function changeColor(input, layer, type, target = null) {
  layer.changeColor(type, input, target);
}
