import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { some } from 'lodash';

const BasicAutocomplete = ({ items, onChange, placeholder, value }) => (
  <Downshift
    inputValue={value}
    onStateChange={e => {
      (e.type === '__autocomplete_change_input__' ||
        e.type === '__autocomplete_unknown__' ||
        e.type === '__autocomplete_keydown_enter__') && onChange(e.selectedItem || e.inputValue);
    }}
    itemToString={i => i ? i : ''}
    render={({
    getInputProps,
      getItemProps,
      isOpen,
      inputValue,
      selectedItem,
      highlightedIndex,
  }) => {
      const selectedItems = (isOpen && items.filter(i => !inputValue || i.toLowerCase().includes(inputValue.toLowerCase()))) || [];

      return (
        <div>
          <input className="input" {...getInputProps({ placeholder })} />
          {some(selectedItems) &&
            <div className="basic-autocomplete">
              {selectedItems.map((item, index) => (
                <div
                  {...getItemProps({ item })}
                  key={item}
                  className="item"
                  style={{
                    color:
                      highlightedIndex === index ? 'white' : 'black',
                    backgroundColor:
                      highlightedIndex === index ? '#337ab7' : 'white',
                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                  }}
                >
                  {item}
                </div>))}
            </div>
          }
        </div>
      );
    }}
  />
);

BasicAutocomplete.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default BasicAutocomplete;
