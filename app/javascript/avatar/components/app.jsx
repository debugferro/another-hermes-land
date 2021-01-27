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
        <AvatarCanvas id={this.props.avatarId} />
        <div className="menu-container">
        <IntegrantButton type={'hairs'} />
        <IntegrantButton type={'eyebrows'} />
        <IntegrantButton type={'eyes'} />
        </div>
        <Showcase />
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
