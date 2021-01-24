import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAvatar } from '../actions/index';

class AvatarCanvas extends Component {

  componentDidMount() {
    this.props.fetchAvatar(this.props.id);
  }

  render() {
    return (
      <div>
        <div>
          <p>Hello World!</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { avatarElements: state.avatarElements };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAvatar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCanvas);

