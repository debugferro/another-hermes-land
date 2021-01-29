import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';
import { colors } from '../assets/colors';
import ColorButton from './color_button';
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
    console.log(color.hexString);
    this.props.layers[this.props.selectedCategory].changeColor(this.props.type, color.hexString, this.props.target);
  }

  handleClick = () => {
    if(!this.state.opened) {
      document.addEventListener("click", () => {this.handleOutsideClick(event, this)}, false);
    }
    else {
      document.addEventListener("click", () => {this.handleOutsideClick(event, this)}, false);
    }

    this.setState(prevState => ({
      opened: !prevState.opened
    }));
  }

  handleOutsideClick = (event, that) => {
    if(that.node) {
      if(!that.node.contains(event.target) && that.state.opened) {
        that.handleClick();
      }
    }
  }

  renderImage = () => {
    const category = this.props.selectedCategory;
    const type = this.props.type;
    const target = this.props.target;
    if(type === 'components') {
      return (<img src={`./avatar/buttons/color-icons/${category}${target}.png`} alt="Color Picker"></img>);
    } else if(type === 'base') {
      if(category !== 'nose') {
        return (<img src={`./avatar/buttons/color-icons/${category}.png`} alt="Color Picker"></img>);
      } else if(category === 'nose') {
        return (<img src={`./avatar/buttons/color-icons/skin.png`} alt="Color Picker"></img>);
      }
    }
  }

  renderColors = () => {
    const category = this.props.selectedCategory;
    let colorsToRender;
    if(this.props.target) {
      colorsToRender = colors[category][this.props.target];
    } else {
      colorsToRender = colors[category];
    }
    return colors.skin.map((color) => {
      return (<ColorButton type={this.props.type} target={this.props.target} color={color} />)
    })
  }

  render() {
    const pickerClass = this.state.opened ? "" : "hiddenEl "
    return (
      <div className="studio-color" >
        <div className="studio-color-container" >
          <div className="pos-relative" ref={node => this.node = node} >
            <div className="color-picker" onClick={this.handleClick} >
              {this.renderImage()}
            </div>
              <div className={pickerClass + "picker"} ref={r => this.colorPicker = r} />
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
  return { selectedCategory: state.selectedCategory, integrants: state.integrants, layers: state.avatarLayers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory, showItems, selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
