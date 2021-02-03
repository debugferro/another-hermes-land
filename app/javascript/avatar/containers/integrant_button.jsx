import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';


class IntegrantButton extends Component {
  handleClick = () => {
    this.props.changeCategory(this.props.layersType);
    this.props.showItems(this.props.integrants, this.props.integrantType);
    this.props.selectItem(this.selectAsset())
  }

  selectAsset = () => {
    let selected;
    console.log(this.props.layers)
    this.props.layers[this.props.layersType].assets.forEach((asset) => {
      this.props.integrants[this.props.integrantType].forEach((integrant) => {
        if (integrant && asset) {
          if (integrant.id === asset.id) { selected = integrant; return; }
        } else { return; }
      })
    })
    return selected;
  }

  render() {
    const src = `./avatar/buttons/${this.props.layersType}.png`
    const activeClass = this.props.layersType === this.props.selectedCategory ? " studio-activebtn" : "";
    return (
      <div className={"studio-assetbtn pointer" + activeClass} onClick={this.handleClick} >
        <img src={src} alt={this.props.layersType} className="categoryimg"></img>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedCategory: state.selectedCategory, integrants: state.integrants, layers: state.avatarLayers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory, showItems, selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrantButton);

