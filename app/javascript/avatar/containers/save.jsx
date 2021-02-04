import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';


class Save extends Component {
  handleClick = () => {
    // TODO: Implement saving

  }

  render() {
    return (
      <div className="studio-save-btn" onClick={this.handleClick} >
        <img src="./avatar/buttons/save.png" alt="Save Changes Button" />
        <form action={`./avatars/${id}`} method="POST">

        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Save);

