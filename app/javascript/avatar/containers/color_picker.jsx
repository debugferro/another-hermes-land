import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';


class ColorPicker extends Component {

  handleClick = () => {
    this.props.changeCategory(this.props.layersType);
    this.props.showItems(this.props.integrants, this.props.integrantType);
    this.props.selectItem(this.selectAsset())
  }

  render() {
    return (
      <div className="studio-color" >
        <div className="color-picker" >
        <img src="./avatar/buttons/rgb.png" alt="Color Picker"></img>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
