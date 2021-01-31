import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import { changeCategory } from '../actions/index';
import Integrant from '../components/integrant';
import IntegrantButton from '../containers/integrant_button';
import ColorPicker from '../containers/color_picker';

class Showcase extends Component {
  renderIntegrants = () => {
    console.log(this.props.selected)
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

  renderColorPickers = () => {
    const selected = this.props.selected;
    const elements = [];
    if(selected) {
      if(selected.category === 'nose') {
        // Render color change for skin
        elements.push((
          <CSSTransition
            timeout={500}
            classNames="studio-color"
            key={1}
          >
            <ColorPicker key={0} type={'base'} target={null} />
          </CSSTransition>
          ));
      } else if(selected.category !== 'eyes'){
        // Render color change for base
        elements.push((
          <CSSTransition
            timeout={500}
            classNames="studio-color"
            key={1}
          >
            <ColorPicker key={0} type={'base'} target={null} />
          </CSSTransition>
        ));
      }
      if(selected.components) {
        if(selected.category === 'eyes') {
          // Render color change for its components
          for(let i = 0; selected.components.length > i; i++) {
            elements.push((
              <CSSTransition
                timeout={500}
                classNames="studio-color"
                key={i+100}
              >
                <ColorPicker key={i+1} type={'components'} target={i} />
              </CSSTransition>
            ));
          }
        }
      }
    }
    const all = [<TransitionGroup>, </TransitionGroup>];
    all.splice(0, 1, elements[0]);
    return (all);
  }

  render() {
    const src = `./avatar/buttons/${this.props.type}.png`
    return (
      <div>
        <div className="showcase">
            <div className="menu-inferior">
              <div className="menu-inf-btns" >
                <IntegrantButton layersType={'hair'} integrantType={'hairs'} />
                <IntegrantButton layersType={'eyebrows'} integrantType={'eyebrows'} />
                <IntegrantButton layersType={'eyes'} integrantType={'eyes'} />
                <IntegrantButton layersType={'mouth'} integrantType={'mouths'} />
                <IntegrantButton layersType={'skin'} integrantType={'noses'} />
                <IntegrantButton layersType={'acessory'} integrantType={'acessories'} />
              </div>
            </div>
            <div className="showcase-content">
              {this.renderIntegrants()}
            </div>
        </div>
        <div>
          {this.renderColorPickers()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedCategory: state.selectedCategory, integrants: state.integrants, showcaseItems: state.showcaseItems, selected: state.showcaseSelected };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Showcase);

