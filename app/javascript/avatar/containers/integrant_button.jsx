import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';

class IntegrantButton extends Component {
  selectAsset = () => {
    const { layers, layersType, integrants, integrantType } = this.props;
    let selected;
    layers[layersType].assets.forEach((asset) => {
      integrants[integrantType].forEach((integrant) => {
        if (integrant && asset) {
          if (integrant.id === asset.id) { selected = integrant; }
        }
      });
    });
    return selected;
  }

  handleClick = () => {
    const {
      changeCategory, showItems, selectItem,
      integrants, layersType, integrantType
    } = this.props;
    changeCategory(layersType);
    showItems(integrants, integrantType);
    selectItem(this.selectAsset());
  }

  render() {
    const { layersType, selectedCategory } = this.props;
    const src = `./avatar/buttons/${layersType}.png`
    const activeClass = layersType === selectedCategory ? " studio-activebtn" : "";
    return (
      <div className={`studio-assetbtn pointer${activeClass}`} onClick={this.handleClick} >
        <img src={src} alt={layersType} className="categoryimg" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return (
    {
      selectedCategory: state.selectedCategory,
      integrants: state.integrants,
      layers: state.avatarLayers
    });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory, showItems, selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrantButton);

