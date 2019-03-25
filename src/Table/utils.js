import orderBy from 'lodash/orderBy';
import some from 'lodash/some';

export function sort({prop, order}, data) {
  return orderBy(data, prop, order === 'descending' ? 'desc' : 'asc');
}

export function filter(filters, filterValues, data) {
  const filterAndVals = {};
  for (let key in filterValues) {
    filterAndVals[key] = {
      value: filterValues[key],
      filter: filters[key].filter,
      prop: filters[key].prop,
    };
  }

  return data.filter((row, key) => some(
    filterAndVals,
    ({filter, value, prop}) =>
      !prop ? some(row, filter.bind(null, value)) : filter(value, row[key])
  ));
}

export function containsIgnoreCase(a, b) {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  return b.indexOf(a) >= 0;
}
