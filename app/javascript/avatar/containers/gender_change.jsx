import React, { Component } from 'react';
import { connect } from 'react-redux';

class GenderChange extends Component {
  handleClick = () => {
    this.form.submit();
  }

  render() {
    const { gender, id, token } = this.props;
    return (
      <div className="studio-top-btn pointer" onClick={this.handleClick} >
        <img src={`./avatar/buttons/gender${gender}.png`} alt="Save Changes Button" />
        <form action={`./avatars/${id}`} method="post" ref={r => this.form = r} acceptCharset="UTF-8" noValidate="novalidate">
          <input type="hidden" name="_method" value="patch" />
          <input type="hidden" name="authenticity_token" value={token} />
          <input type="hidden" name="avatar[gender]" id="avatar_img" value={gender} />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { layers: state.avatarLayers };
}

export default connect(mapStateToProps)(GenderChange);
