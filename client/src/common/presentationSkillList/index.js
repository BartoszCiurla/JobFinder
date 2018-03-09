import React from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';
import StarRatings from 'react-star-ratings';


const PresentationSkillList = props => {
  return (
    some(props.items)
    && <table>
      <thead>
        <tr>
          <th colSpan="2">
            {props.header}
          </th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((i, index) => (
          <tr key={index}>
            <td>{i.description}</td>
            <td>
              <StarRatings
                starRatedColor={props.starRatedColor}
                starDimension={'15px'}
                rating={i.level}
                numberOfStarts={5}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

PresentationSkillList.propTypes = {
  starRatedColor: PropTypes.string,
  header: PropTypes.string,
  items: PropTypes.array,
};

PresentationSkillList.defaultProps = {
  starRatedColor: "grey"
};

export default PresentationSkillList;
