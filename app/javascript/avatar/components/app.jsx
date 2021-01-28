import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AvatarCanvas from '../containers/avatar_canvas';
import IntegrantButton from '../containers/integrant_button';
import Showcase from '../containers/showcase';

class App extends Component {
  render(){
    return(
      <div className="studio-container">
      <div className="studio-left">
        <div className="menu-container">
          <div className="menu-superior">
          </div>
          <div className="menu-inferior">
            <IntegrantButton type={'hairs'} />
            <IntegrantButton type={'eyebrows'} />
            <IntegrantButton type={'eyes'} />
          </div>
        </div>
      </div>
        <div className="studio-right">
          <AvatarCanvas id={this.props.avatarId} />
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
