import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';


class ColorButton extends Component {

  handleClick = () => {
    this.props.layers[this.props.selectedCategory].changeColor(this.props.type, this.props.color.value, this.props.target);
  }

  render() {
    return (
      <button style={{backgroundColor: this.props.color.valueShown}} className="color-opt" onClick={this.handleClick} />
    );
  }
}

function mapStateToProps(state) {
  return { selectedCategory: state.selectedCategory, integrants: state.integrants, layers: state.avatarLayers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory, showItems, selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorButton);

