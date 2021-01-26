import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory } from '../actions/index';
import Integrant from '../components/integrant';

class Showcase extends Component {
  renderIntegrants = () => {
    if (this.props.showcaseItems.length > 0) {
      return this.props.showcaseItems.map((integrant) => {
        return <Integrant key={integrant.id} base={integrant.base} components={integrant.components} integrant={integrant} />
      })
    } else {
      return <p>Select a category...</p>
    }
  }

  render() {
    const src = `./avatar/buttons/${this.props.type}.png`
    return (
      <div className="showcase">
        {this.renderIntegrants()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedCategory: state.selectedCategory, integrants: state.integrants, showcaseItems: state.showcaseItems };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Showcase);

