export const DOMAIN = 'react-data-components';
export const ActionTypes = {
  DATA_LOADED: `@@${DOMAIN}/DATA_LOADED`,
  INITIALIZE: `@@${DOMAIN}/INITIALIZE`,
  PAGE_NUMBER_CHANGE: `@@${DOMAIN}/PAGE_NUMBER_CHANGE`,
  PAGE_SIZE_CHANGE: `@@${DOMAIN}/PAGE_SIZE_CHANGE`,
  DATA_FILTER: `@@${DOMAIN}/DATA_FILTER`,
  DATA_SORT: `@@${DOMAIN}/DATA_SORT`,
};

export const initialize = (
  data,
  table,
) => ({
  type: ActionTypes.INITIALIZE,
  payload: data,
  meta: { table },
});

// Probably a bad idea to send down `filters` here.
export const dataFilter = (
  key,
  value,
  filters,
  table,
) => ({
  type: ActionTypes.DATA_FILTER,
  payload: { key, value, filters },
  meta: { table },
});

export const dataSort = (sortBy, table) => ({
  type: ActionTypes.DATA_SORT,
  payload: sortBy,
  meta: { table },
});

export const dataLoaded = (
  data,
  table,
) => ({
  type: ActionTypes.DATA_LOADED,
  payload: data,
  meta: { table },
});

export const pageNumberChange = (
  pageNumber,
  table,
) => ({
  type: ActionTypes.PAGE_NUMBER_CHANGE,
  payload: pageNumber,
  meta: { table },
});

export const pageSizeChange = (
  pageSize,
  table,
) => ({
  type: ActionTypes.PAGE_SIZE_CHANGE,
  payload: pageSize,
  meta: { table },
});
