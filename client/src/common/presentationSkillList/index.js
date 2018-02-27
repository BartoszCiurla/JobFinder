import React from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';
import StarRatings from 'react-star-ratings';


const PresentationSkillList = props => {
  return (
    some(props.items) && <div className="skill-list">
      <p>{props.header}</p>
      {props.items.map((i, index) =>
        (<div key={index}>
          <StarRatings
            starDimension={'15px'}
            rating={i.level}
            numberOfStarts={5}
          />
          <span>{i.description}</span>
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
