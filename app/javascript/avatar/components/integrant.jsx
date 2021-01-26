import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initCanvas } from '../actions/init_canvas';
import { changeAvIntegrant } from '../actions/index';

class Integrant extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  // handleImg = () => {
  //   if(this.props.components){
  //     return(
  //       this.props.components.map((component) => {
  //         return <img key={component} src={`./avatar/${component}`} className="absolute"></img>
  //       })
  //     );
  //   }
  // }

  componentDidMount() {
    const avatar = Object.assign({}, this.props.avatar);
    avatar[this.props.integrant.category] = this.props.integrant;
    avatar.colorOf = this.props.avatar.colorOf;
    initCanvas(avatar, this.canvas.current);
  }

  handleClick = () => {
    // console.log(this.props.avatarLayers);
    const layer = this.props.avatarLayers[this.props.integrant.category];
    const category = this.props.integrant.category;
    this.props.changeAvIntegrant(layer, [this.props.integrant], category);
    // this.props.avatarLayers[this.props.integrant.category].change([this.props.integrant]);
    // console.log(this.props.avatarLayers);
  }

  render(){
    // const src = `./avatar/${this.props.base}`;
    // <img src={`./avatar/${this.props.base}`} className="relative"></img>
    // const canvasClassName = this.state.loaded ? "relative" : "relative hiddenEl";
    // const pClassName = !this.state.loaded ? "pshow" : "pshow";
    console.log(this.props.integrant);
    console.log(this.props.avatarLayers[this.props.integrant.category])
    const divClass = this.props.integrant.id === this.props.avatarLayers[this.props.integrant.category].assets[0].id ? "relative avIntegrant pointer active" : "relative avIntegrant pointer";
    return(
      <div className={divClass} onClick={this.handleClick}>
        <canvas height="144" width="144" ref={this.canvas} className="relative"></canvas>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { avatar: state.avatar, selectedCategory: state.selectedCategory,
    avatarLayers: state.avatarLayers, integrants: state.integrants,
    showcaseItems: state.showcaseItems };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeAvIntegrant }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Integrant);


  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.loaded) {
  //     return true;
  //   } else if (this.props != nextProps) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

// {id: 0, category: this.props.integrant.category, base: "empty.png", components: [], gender: 0, skintonalized: false }
  //      <img src={`./avatar/${this.props.base}`} className="absolute"></img>
  //      {this.handleImg()}
