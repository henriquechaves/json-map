import React from 'react';
import PropTypes from 'prop-types';

import styles from '../assets/css/listItem.css';

export function ListItem(props) {
  return (
    <div className={`row ${styles.onOverItem}`}>
      <div className="col-md-4">
        <p className="text-center">
          {props.item.name}
        </p>
      </div>
      <div className="col-md-4">
        <p className="text-center">
          {props.item.city}
        </p>
      </div>
      <div className="col-md-2">
        <p className="text-center">
          {props.item.gender}
        </p>
      </div>
      <div className="col-md-2">
        <p className="text-center">
          {(props.item.atheist)?"Yes":"No"}
        </p>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    cuid: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    atheist: PropTypes.bool,
  }).isRequired,
};

export default ListItem;
