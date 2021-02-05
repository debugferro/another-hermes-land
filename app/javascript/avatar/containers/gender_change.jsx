import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory, showItems, selectItem } from '../actions/index';

class GenderChange extends Component {
  handleClick = () => {
    // TODO: Implement saving
    this.form.submit();
  }

  render() {
    return (
      <div className="studio-top-btn pointer" onClick={this.handleClick} >
        <img src={`./avatar/buttons/gender${this.props.gender}.png`} alt="Save Changes Button" />
        <form action={`./avatars/${this.props.id}`} method="post" ref={r => this.form = r} acceptCharset="UTF-8" noValidate="novalidate">
          <input type="hidden" name="_method" value="patch" />
          <input type="hidden" name="authenticity_token" value={this.props.token} />
          <input type="hidden" name="avatar[gender]" id="avatar_img" value={this.props.gender} />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { layers: state.avatarLayers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory, showItems, selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenderChange);

