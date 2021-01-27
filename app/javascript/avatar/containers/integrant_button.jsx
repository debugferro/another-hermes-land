import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';


class IntegrantButton extends Component {

  handleClick = () => {
    this.props.changeCategory(this.props.type);
    this.props.showItems(this.props.integrants, this.props.type);
    this.props.selectItem(this.selectAsset())
  }

  selectAsset = () => {
    let selected;
    this.props.layers[this.props.type].assets.forEach((asset) => {
      this.props.integrants[this.props.type].forEach((integrant) => {
        console.log(integrant.id === asset.id);
        if (integrant.id === asset.id) { selected = integrant; return; }
      })
    })
    return selected;
  }

  render() {
    const src = `./avatar/buttons/${this.props.type}.png`
    return (
      <div onClick={this.handleClick} >
        <img src={src} alt={this.props.type} className="categoryimg"></img>
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

