import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';
import iro from '@jaames/iro';

class ColorPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opened: false
    }
  }
  handleClick = () => {
    this.props.changeCategory(this.props.layersType);
    this.props.showItems(this.props.integrants, this.props.integrantType);
    this.props.selectItem(this.selectAsset())
  }

  componentDidMount() {
    const picker = new iro.ColorPicker(this.colorPicker, {
      width: 200,
      layout: [
        {
          component: iro.ui.Box,
          options: {}
        },
        {
          component: iro.ui.Slider,
          options: { sliderType: 'hue' }
        }
      ]
    });
    picker.on('color:change', this.changeColor)
  }

  changeColor = (color) => {
    this.props.layers[this.props.selectedCategory].changeColor(this.props.type, color.hexString, this.props.target);
  }

  handleClick = () => {
    if(!this.state.opened) {
      document.addEventListener("click", this.handleOutsideClick, false);
    }
    else {
      document.addEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      opened: !prevState.opened
    }));
  }

  handleOutsideClick = (event) => {
    if(!this.node.contains(event.target) && this.state.opened) {
      this.handleClick();
    }
  }

  render() {
    const pickerClass = this.state.opened ? "" : "hiddenEl "
    return (
      <div className="studio-color" >
        <div ref={node => this.node = node} >
          <div className="color-picker" onClick={this.handleClick} >
            <img src="./avatar/buttons/rgb.png" alt="Color Picker"></img>
          </div>
            <div className={pickerClass + "picker"} ref={r => this.colorPicker = r} />
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
