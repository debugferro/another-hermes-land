import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AvatarCanvas from '../containers/avatar_canvas';
import Showcase from '../containers/showcase';
import ColorPicker from '../containers/color_picker';

class App extends Component {
  render(){
    return(
      <div className="studio-container">
      <div className="studio-superior">
        <div className="menu-container">
          <div className="menu-superior">
          </div>
        </div>
        <AvatarCanvas id={this.props.avatarId} />
      </div>
        <div className="studio-inferior">
          <Showcase />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { avatar: state.avatar, selectedCategory: state.selectedCategory,
    avatarLayers: state.avatarLayers, integrants: state.integrants,
    showcaseItems: state.showcaseItems };
}

export default connect(mapStateToProps)(App);
