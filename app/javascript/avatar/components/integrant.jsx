import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initCanvas } from '../actions/init_canvas';
import { changeAvIntegrant, selectItem } from '../actions/index';

class Integrant extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.state = {
      clicked: this.props.integrant.id === this.props.avatarLayers[this.props.integrant.category].assets[0].id ? true : false
    }
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
    // if(this.props.integrant.id === this.props.avatarLayers[this.props.integrant.category].assets[0].id) {
    //   this.setState
    // }
  }

  handleClick = () => {
    // console.log(this.props.avatarLayers);
    const layer = this.props.avatarLayers[this.props.integrant.category];
    const category = this.props.integrant.category;
    this.props.changeAvIntegrant(layer, [this.props.integrant], category);
    this.props.selectItem(this.props.integrant);
    // this.props.avatarLayers[this.props.integrant.category].change([this.props.integrant]);
    // console.log(this.props.avatarLayers);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.clicked != nextState.clicked) { return true; }
  //   if (this.props != nextProps) { return true; }
  //   return true;
  // }

  render(){
    // const src = `./avatar/${this.props.base}`;
    // <img src={`./avatar/${this.props.base}`} className="relative"></img>
    // const canvasClassName = this.state.loaded ? "relative" : "relative hiddenEl";
    // const pClassName = !this.state.loaded ? "pshow" : "pshow";
    const divClass = this.props.selected.id === this.props.integrant.id ? "relative avIntegrant pointer active" : "relative avIntegrant pointer";
    return(
      <div className={divClass} onClick={this.handleClick}>
        <img src="./avatar/buttons/loading.png" className="loading" />
        <canvas height="144" width="144" ref={this.canvas} className="relative"></canvas>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { avatar: state.avatar, selectedCategory: state.selectedCategory,
    avatarLayers: state.avatarLayers, integrants: state.integrants,
    showcaseItems: state.showcaseItems, selected: state.showcaseSelected };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeAvIntegrant, selectItem }, dispatch);
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
