// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { initCanvas } from '../actions/init_canvas';

// class Avatar extends Component {
//   constructor(props) {
//     super(props);

//     this.canvas = React.createRef();
//   }
//   componentDidMount() {
//     console.log("Initializing canvas....");
//     this.props.initCanvas(this.props.avatarElements, this.canvas);
//     console.log("Initializing canvas finished");
//   }

//   render() {
//     console.log("Rendering canvas....");
//     return (
//       <canvas id="avatarCanvas" ref={this.canvas}></canvas>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return { avatarLayers: state.avatarLayers, avatarElements: state.avatarElements };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ initCanvas }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
