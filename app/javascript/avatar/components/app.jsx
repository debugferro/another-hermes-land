import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import AvatarCanvas from '../containers/avatar_canvas';
import Showcase from '../containers/showcase';
import ColorPicker from '../containers/color_picker';
import Save from '../containers/save';

class App extends Component {
  render(){
    console.log("updating app.jsx")
    return(
      <CSSTransition
        className="studio-container"
        timeout={800}
      >
      <div className="studio-container">
      <div className="studio-superior">
        <div className="menu-container">
          <div className="menu-content">
            <Save token={this.props.token} id={this.props.avatarId} />
          </div>
        </div>
        <AvatarCanvas id={this.props.avatarId} />
      </div>
        <div className="studio-inferior">
          <Showcase />
        </div>
      </div>
      </CSSTransition>
    );
  }
}

function mapStateToProps(state) {
  return { avatar: state.avatar, selectedCategory: state.selectedCategory,
    avatarLayers: state.avatarLayers, integrants: state.integrants,
    showcaseItems: state.showcaseItems };
}

export default connect(mapStateToProps)(App);
