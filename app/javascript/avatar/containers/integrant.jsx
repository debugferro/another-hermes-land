import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initCanvas } from '../actions/init_canvas';
import { changeAvIntegrant, selectItem } from '../actions/index';

class Integrant extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  componentDidMount() {
    // const avatar = Object.assign({}, this.props.avatar);
    const { avatar, integrant } = this.props;
    const integrantAvatar = { ...avatar };

    integrantAvatar[integrant.category] = integrant;
    integrantAvatar.colorOf = avatar.colorOf;
    initCanvas(integrantAvatar, this.canvas.current);
  }

  handleClick = () => {
    const { avatarLayers, integrant, changeAvIntegrant, selectItem } = this.props;
    changeAvIntegrant(avatarLayers, integrant, integrant.category);
    selectItem(integrant);
  }

  render() {
    let divClass = "relative avIntegrant pointer";
    const { selected, integrant } = this.props;
    if (selected) {
      divClass = selected.id === integrant.id
        ? `${divClass} active` : divClass;
    }
    return (
      <div className={divClass} onClick={this.handleClick}>
        <img src="./avatar/buttons/loading.png" className="loading" alt="" />
        <canvas height="144" width="144" ref={this.canvas} className="relative" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return (
    {
      avatar: state.avatar,
      avatarLayers: state.avatarLayers,
      selected: state.showcaseSelected
    }
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeAvIntegrant, selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Integrant);
