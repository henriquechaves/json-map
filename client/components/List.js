import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import ListItem from './ListItem';

import styles from '../assets/css/list.css';

export function List(props) {
  return (
    <div className={`container ${styles.list} ${props.activePage}`}>
      {props.data.map(item =>
        <ListItem item={item} key={cuid()} />
      )}

    </div>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    cuid: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    atheist: PropTypes.bool,
  })).isRequired,
};

export default List;
