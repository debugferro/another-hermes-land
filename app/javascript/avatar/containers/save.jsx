import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';


class Save extends Component {
  constructor(props) {
    super(props)

    this.state = {
      assets: null,
      colors: null,
      img: null
    }
  }

  handleClick = () => {
    // TODO: Implement saving


  }

  render() {
    return (
      <div className="studio-save-btn" onClick={this.handleClick} >
        <img src="./avatar/buttons/save.png" alt="Save Changes Button" />
        <form action={`./avatars/${id}`} method="POST" ref={r => this.form = r}>
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

