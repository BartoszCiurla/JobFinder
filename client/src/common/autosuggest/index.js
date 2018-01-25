import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as ReactAutosuggest } from 'react-autosuggest';

class Autosuggest extends Component {
  state = {
    suggestions: []
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => suggestion.name;

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  render() {
    const { suggestions } = this.state;
    const { placeholder, value, onChange } = this.props;
    const inputProps = {
      placeholder,
      value,
      onChange
    };

    return (
      <ReactAutosuggest
        inputProps={inputProps}
        renderSuggestion={this.renderSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        suggestions={suggestions}
      />
    );
  }
}

Autosuggest.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
};

export default Autosuggest;
