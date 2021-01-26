import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems } from '../actions/index';


class IntegrantButton extends Component {
  handleClick = () => {
    this.props.changeCategory(this.props.type);
    this.props.showItems(this.props.integrants, this.props.type);
  }

  render() {
    const src = `./avatar/buttons/${this.props.type}.png`
    return (
      <div onClick={this.handleClick} >
        <img src={src} alt={this.props.type} className="categoryimg"></img>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedCategory: state.selectedCategory, integrants: state.integrants };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory, showItems }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrantButton);

