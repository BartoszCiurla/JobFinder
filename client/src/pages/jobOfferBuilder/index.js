import React, { Component } from 'react';

import Autosuggest from '../../common/autosuggest';

class JobOfferBuilder extends Component {
  state = {
    value: '',
    suggestions: [
      { name: 'c', id: 1 },
      { name: 'cw', id: 2 },
      { name: 'cwe', id: 3 },
      { name: 'cwel', id: 4 }
    ]
  }

  onChange = (event, { newValue }) => {
    console.log(event);
    this.setState({
      value: newValue
    });
  };

  render() {

    return (
      <div>
        <Autosuggest
          placeholder={'test test'}
          value={this.state.value}
          suggestions={this.state.suggestions}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default JobOfferBuilder;
