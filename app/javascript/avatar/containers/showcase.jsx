import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCategory } from '../actions/index';
import Integrant from '../components/integrant';

class Showcase extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     clicked:
  //   }
  // }
  renderIntegrants = () => {
    if (this.props.showcaseItems.length > 0) {
      return this.props.showcaseItems.map((integrant) => {
        return <Integrant key={integrant.id} base={integrant.base} components={integrant.components} integrant={integrant} />
      })
    } else {
      return(
        <div className="showcase-unload">
          <p>Select a category...</p>
        </div>
      );
    }
  }

  render() {
    const src = `./avatar/buttons/${this.props.type}.png`
    return (
      <div className="showcase">
        <div className="showcase-content">
        {this.renderIntegrants()}
        </div>
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

