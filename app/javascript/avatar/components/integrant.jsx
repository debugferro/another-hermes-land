import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Integrant extends Component {
  render(){
    const src = `./avatar/${this.props.base}`;
    return(
      <div>
        <img src={src} alt=""></img>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { avatar: state.avatar, selectedCategory: state.selectedCategory,
//     avatarLayers: state.avatarLayers, integrants: state.integrants,
//     showcaseItems: state.showcaseItems };
// }

// export default connect(mapStateToProps)(App);
