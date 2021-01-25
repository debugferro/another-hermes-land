import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAvatar } from '../actions/index';
import { initCanvas } from '../actions/init_canvas';
// import Avatar from './avatar';

class AvatarCanvas extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.props.fetchAvatar(this.props.id, this.canvas);
    // this.props.initCanvas(this.props.avatarElements, this.canvas);
  }

  render() {
    return (
      <div>
        <div>
          <canvas id="avatarCanvas" ref={this.canvas}></canvas>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { avatarElements: state.avatarElements };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAvatar, initCanvas }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCanvas);

