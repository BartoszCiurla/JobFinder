import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import RegularField from '../../../../common/RegularField';
import ValidatedInput from '../../../../common/ValidatedInput';
import DatePicker from '../../../../common/datePicker';

import Resources from './resources';

class Certification extends Component {
  state = {
    errors: [],
    certificateName: '',
    finishDate: {
      month: '',
      year: '',
    }
  }

  getErrorMessage = (name) => (
    (_.find(this.state.errors, e => e.attribute === name) || { message: '' }).message
  )

  onChange = ({ target: { name, value } }) => (this.setState({ [name]: value }))

  onChangeDate = (dateName, name, value) => {
    let date = this.state[dateName];
    date[name] = value;

    this.setState({date});
  }

  handleAddCertification = () => {
    const { certificateName, finishDate } = this.state;

    const result = this.props.addCertification({ certificateName, finishDate});
    this.setState({ errors: result.errors });

    result.isValid() &&
      this.setState({ certificateName: '', finishDate: { month: '', year: ''} });
  }

  render() {
    const {
      certificateName,
      finishDate
    } = this.state;

    return (
      <div>
        <RegularField
          name={'certificateName'}
          value={certificateName}
          onChange={this.onChange}
          placeholder={Resources.certificateName}
          className="input"
          errorMessage={this.getErrorMessage('certificateName')}
        />
        <ValidatedInput errorMessage={this.getErrorMessage('finishDate')}>
          <div style={{ display: 'flex' }}>
            {Resources.finishDate}
            <DatePicker
              language="pl"
              name={'finishDate'}
              month={finishDate.month}
              year={finishDate.year}
              onChange={this.onChangeDate}
            />
          </div>
        </ValidatedInput>
        <button onClick={this.handleAddCertification}>{Resources.submit}</button>
      </div>
    );
  }
}

Certification.propTypes = {
  addCertification: PropTypes.func.isRequired
};

export default Certification;
