import React, { Component } from 'react';
import { connect } from 'react-redux';

class ColorButton extends Component {
  handleClick = () => {
    const
      {
        layers, selectedCategory,
        type, color, target
      } = this.props;
    layers[selectedCategory].changeColor(type, color.value, target);
  }

  render() {
    return (
      <button style={{backgroundColor: this.props.color.valueShown}} className="color-opt" onClick={this.handleClick} />
    );
  }
}

function mapStateToProps(state) {
  return { selectedCategory: state.selectedCategory, layers: state.avatarLayers };
}

export default connect(mapStateToProps)(ColorButton);
