import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Profession from '../../common/profession';

import Resources from './resources';
import { setOfferCategory, setOfferProfession } from '../../actions/offer';

//import Autosuggest from '../../common/autosuggest';

class OfferBuilder extends Component {
  state = {}
  onChange = (event, { newValue }) => {
    console.log(event);
    this.setState({
      value: newValue
    });
  };

  render() {
    const {
      category,
      profession
    } = this.props;

    return (
      <div className="offer-builder">
        <div className="form">
          <h2 className="title">{Resources.title}</h2>
          <Profession
            category={category}
            profession={profession}
            onChangeCategory={this.props.setOfferCategory}
            onChangeProfession={this.props.setOfferProfession}
          />
          <button className="btn btn-primary full-width">{Resources.submit}</button>
        </div>
      </div>
    );
  }
}

OfferBuilder.propTypes = {
  setOfferCategory: PropTypes.func.isRequired,
  setOfferProfession: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired
};

const mapStateToProps = ({ offer }) => ({
  category: offer.category,
  profession: offer.profession
});


const mapDispatchToProps = dispatch => bindActionCreators({
  setOfferCategory,
  setOfferProfession
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OfferBuilder);

