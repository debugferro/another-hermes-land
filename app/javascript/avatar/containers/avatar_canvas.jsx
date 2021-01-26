import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initializeCanvas } from '../actions/index';

class AvatarCanvas extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.props.initializeCanvas(this.props.id, this.canvas, this.props.selectedCategory);
  }

  render() {
    return (
      <div>
        <canvas id="avatarCanvas" ref={this.canvas}></canvas>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { avatar: state.avatar, selectedCategory: state.selectedCategory };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeCanvas }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCanvas);

