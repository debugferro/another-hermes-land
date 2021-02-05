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
    const { initializeCanvas, id, selectedCategory } = this.props;
    initializeCanvas(id, this.canvas, selectedCategory);
  }

  render() {
    return (
      <div className="avatar-container">
        <canvas id="avatarCanvas" ref={this.canvas} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedCategory: state.selectedCategory };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initializeCanvas }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCanvas);
