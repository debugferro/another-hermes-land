import React, { Component } from 'react';
import { connect } from 'react-redux';
import iro from '@jaames/iro';

import ColorButton from './color_button';
import colors from '../assets/colors';

const { v4: uuidv4 } = require('uuid');

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };
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
    picker.on('color:change', this.changeColor);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const colorsList = colors;
    const { selectedCategory, target } = nextProps;
    if (nextProps === this.props && nextState !== this.state) {
      return true;
    }
    if (target >= 0) {
      return Array.isArray(colorsList[selectedCategory][target]);
    }
    return Array.isArray(colorsList[selectedCategory]);
  }

  changeColor = (color) => {
    const { layers, selectedCategory, type, target } = this.props;
    layers[selectedCategory].changeColor(type, color.hexString, target);
  }

  handleClick = () => {
    const { opened } = this.state;
    if (!opened) {
      document.addEventListener("click", (event) => { this.handleOutsideClick(event, this); }, false);
    } else {
      document.addEventListener("click", (event) => { this.handleOutsideClick(event, this); }, false);
    }

    this.setState((prevState) => ({
      opened: !prevState.opened
    }));
  }

  handleOutsideClick = (event, that) => {
    if (that.node) {
      if (!that.node.contains(event.target) && that.state.opened) {
        that.handleClick();
      }
    }
  }

  renderImage = () => {
    const { selectedCategory, type, target } = this.props;
    const baseUrl = "./avatar/buttons/color-icons";
    if (type === 'components') {
      return (<img src={`${baseUrl}/${selectedCategory}${target}.png`} alt="Color Picker" />);
    }
    if (type === 'base') {
      if (selectedCategory !== 'nose') {
        return (<img src={`${baseUrl}/${selectedCategory}.png`} alt="Color Picker" />);
      }
      if (selectedCategory === 'nose') {
        return (<img src={`${baseUrl}/skin.png`} alt="Color Picker" />);
      }
    }
  }

  renderColors = () => {
    const { selectedCategory, target, type } = this.props;
    const colorsList = colors;
    const colorsToRender = target === null
      ? colorsList[selectedCategory] : colorsList[selectedCategory][target];

    if (colorsToRender) {
      return colorsToRender.map((color) => {
        return (<ColorButton key={uuidv4()} type={type} target={target} color={color} />);
      });
    }
  }

  render() {
    const { opened } = this.state;
    const pickerClass = opened ? "" : "hiddenEl ";
    return (
      <div className="studio-color">
        <div className="studio-color-container">
          <div className="pos-relative" ref={node => this.node = node}>
            <div className="color-picker pointer" onClick={this.handleClick}>
              {this.renderImage()}
            </div>
              <div className={`${pickerClass}picker`} ref={r => this.colorPicker = r} />
          </div>
          <div className="opts-container">
            {this.renderColors()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedCategory: state.selectedCategory, layers: state.avatarLayers };
}

export default connect(mapStateToProps)(ColorPicker);
