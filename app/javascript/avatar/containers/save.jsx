import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';

class Save extends Component {
  constructor(props) {
    super(props)

    this.state = {
      assets: '',
      colors: '',
      img: ''
    }
  }

  handleClick = () => {
    // TODO: Implement saving
    const layers = this.props.layers;
    const dataURI = layers.main.element.toDataURL('image/png');
    const assetData = [];
    let colorData = {};
    Object.keys(layers).forEach((key) => {
      if (key === 'main') { return; }
      layers[key].assets.forEach((asset) => { if (asset) { assetData.push(asset.id); } });
      colorData[`${key}_color`] = layers[key].assetColors;
      layers[key].componentColors.forEach((color) => { colorData[`${key}_color`].push(color); });
    });
    // for (let key in layers) {
    //   if(key === 'main') { continue; }
    //   layers[key].assets.forEach(function (asset) { if (asset) { assetData.push(asset.id); } });
    //   colorData[`${key}_color`] = layers[key].assetColors;
    //   layers[key].componentColors.forEach(function (color) { colorData[`${key}_color`].push(color); });
    // }
    colorData = JSON.stringify(colorData);
    this.setState({ assets: assetData, colors: colorData, img: dataURI }, () => {
      this.form.submit();
    });
  }

  render() {
    return (
      <div className="studio-top-btn pointer" onClick={this.handleClick} >
        <img src="./avatar/buttons/save.png" alt="Save Changes Button" />
        <form action={`./avatars/${this.props.id}`} method="post" ref={r => this.form = r} acceptCharset="UTF-8" noValidate="novalidate">
          <input type="hidden" name="_method" value="patch" />
          <input type="hidden" name="authenticity_token" value={this.props.token} />
          <input type="hidden" name="avatar[img]" id="avatar_img" value={this.state.img} />
          <input type="hidden" name="avatar[assets]" id="avatar_assets" value={this.state.assets} />
          <input type="hidden" name="avatar[colors]" id="avatar_colors" value={this.state.colors} />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { layers: state.avatarLayers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory, showItems, selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Save);

