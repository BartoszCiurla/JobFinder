import React from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';
import StarRatings from 'react-star-ratings';


const PresentationSkillList = props => {
  return (
    some(props.items) && <div>
      <p>{props.header}</p>
      {props.items.map((i, index) =>
        (<div key={index}>
          <p>{i.description}</p>
          <StarRatings
            starDimension={'25px'}
            rating={i.level}
            numberOfStarts={5}
          />
        </div>)
      )}
    </div>
  );
};

PresentationSkillList.propTypes = {
  header: PropTypes.string,
  items: PropTypes.array,
};

export default PresentationSkillList;
