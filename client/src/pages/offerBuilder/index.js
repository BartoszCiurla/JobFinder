import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';

import Profession from '../../common/profession';

import Routes from '../../constants/routes';
import Resources from './resources';
import { getUserCredentials } from '../../utils/auth';
import { setOfferCategory, setOfferProfession, createOffer } from '../../actions/offerBuilder';

class OfferBuilder extends Component {
  tryCreateOffer = () => {
    this.props.createOffer(getUserCredentials(this.props.cookies))
      .then(this.props.history.push(Routes.employer));
  }

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
          <button onClick={this.tryCreateOffer} className="btn btn-primary full-width">{Resources.submit}</button>
        </div>
      </div>
    );
  }
}

OfferBuilder.propTypes = {
  setOfferCategory: PropTypes.func.isRequired,
  setOfferProfession: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  history: PropTypes.object.isRequired,
  createOffer: PropTypes.func.isRequired
};

const mapStateToProps = ({ offerBuilder }) => ({
  category: offerBuilder.category,
  profession: offerBuilder.profession
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setOfferCategory,
  setOfferProfession,
  createOffer
}, dispatch);

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferBuilder)));

