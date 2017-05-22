import cuid from 'cuid';

import * as helpers from './ActionsHelpers';
import loadLocalJSON from '../api/loadLocalJSON';
import config from '../../server/config';

export const ADD_DATA = 'ADD_DATA';
export const SORT_DATA_STATUS = 'SORT_DATA_STATUS';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export function addData(data) {
  return {
    type: ADD_DATA,
    data,
  };
}

export function sortDataStatus(sortStatus) {
  return {
    type: SORT_DATA_STATUS,
    sortStatus,
  };
}

export function changePage(activePage) {
  return {
    type: CHANGE_PAGE,
    activePage,
  };
}

export function sortData(data, property, sortStatus) {
  return (dispatch) => {
    sortStatus[property] = !sortStatus[property];
    dispatch(sortDataStatus(sortStatus));
    const sortedData = data.sort(helpers.comparisonSort(property, sortStatus));
    dispatch(addData(sortedData));
    return;
  }
}

export function filterData(data, sortStatus, require) {
  return (dispatch) => {
    const filteredData = helpers.filter(data, require);
    dispatch(addData(filteredData));
    return;
  }
}

export function fetchData(property = 'name', sortStatus = {id:false,name:true}) {
  return (dispatch) => {
    return loadLocalJSON()
    .then(data => {
      // dá garantia de id unico aos itens
      // const dataCuid = data.map(item => Object.assign({}, item, { cuid: cuid() }));
      // dispatch(sortDataStatus(sortStatus));
      // const sortedData = dataCuid.sort(helpers.comparisonSort(property, sortStatus));
      dispatch(changePage(1));
      dispatch(addData(data));
    });
  };
}
