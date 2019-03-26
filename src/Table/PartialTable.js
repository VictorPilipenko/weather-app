import React, { Component } from 'react';
import Table from './Table';
import Pagination from './Pagination';

export default class PartialTable extends Component {
  render() {
    const {
      onFilter,
      onPageSizeChange,
      onPageNumberChange,
      onSort,
      pageLengthOptions,
      columns,
      keys,
      buildRowOptions,
    } = this.props;

    // Protect against unloaded data.
    if (!this.props.data) {
      return null;
    }

    const {
      page,
      pageSize,
      pageNumber,
      totalPages,
      sortBy,
      filterValues,
    } = this.props.data;

    return (
      <div className="container" style={{width: "96%"}}>
        <div className="row">
          <div className="col-xs-4">

            <div>
              <label htmlFor="search-field" style={{
                margin: "5px 5px 5px 0px",
              }}>Search:</label>
              <input
                id="search-field"
                type="search"
                placeholder="...find your domain"
                spellcheck="false"
                value={filterValues.globalSearch}
                onChange={onFilter.bind(null, 'globalSearch')}
                style={{
                  color: "black",
                  borderRadius: "4px",
                  border: "none",
                  outline: "none",
                  padding: "0 0 0 5px",
                }}
              />
            </div>
          </div>

        </div>
        <Table
          className="table table-bordered"
          dataArray={page}
          columns={columns}
          keys={keys}
          buildRowOptions={buildRowOptions}
          sortBy={sortBy}
          onSort={onSort}
          style={{marginTop: "20px"}}
        />

        <div className="col-xs-4" style={{ display: "flex" }}>
          <Pagination
            className="pagination pull-right"
            currentPage={pageNumber}
            totalPages={totalPages}
            onChangePage={onPageNumberChange}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end"}}>
          <label htmlFor="page-menu">Page size:</label>
          <select
            id="page-menu"
            value={pageSize}
            onChange={onPageSizeChange}
            style={{color: "black"}}
          >
            {pageLengthOptions.map(opt =>
              <option key={opt} value={opt}>
                {opt === 0 ? 'All' : opt}
              </option>,
            )}
          </select>
        </div>

      </div>
    );
  }
}
