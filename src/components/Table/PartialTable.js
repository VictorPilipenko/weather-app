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

    // console.log(this.props)

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
      <div className="container" style={{ width: "96%" }}>

        <div
          style={{
            margin: "15px 0",
            display: 'flex',
            justifyContent: 'center',
          }}>
          <label
            htmlFor="search-field"
            style={{
              margin: "5px 5px 5px 0px",
            }}
          ></label>
          <input
            id="search-field"
            type="search"
            placeholder="...find your domain"
            spellCheck="false"
            value={filterValues.globalSearch}
            onChange={onFilter.bind(null, 'globalSearch')}
            style={{
              color: "black",
              borderRadius: "4px",
              border: "none",
              outline: "none",
              padding: "0 0 0 5px",
              textAlign: 'center',
            }}
          />
        </div>

        <div className="row">

          <div
            className="col-xs-4"
            style={{
              display: "flex",
              // paddingLeft: "0px",
              width: '60%'
            }}
          >
            <Pagination
              className="pagination pull-right"
              currentPage={pageNumber}
              totalPages={totalPages}
              onChangePage={onPageNumberChange}
            />
          </div>



          <div className="col-xs-4" style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "baseline",
            float: "right",
            margin: "15px 0",
            paddingRight: "17px",
            width: "40%",
          }}>
            <label htmlFor="page-menu">Page size:{'\u00A0'}</label>
            <select
              id="page-menu"
              value={pageSize}
              onChange={onPageSizeChange}
              style={{
                color: "black",
                padding: "0px 5px 0px 10px",
                borderRadius: "4px",
                background: "#f8f8f8",
                border: "none",
                outline: "none",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              {pageLengthOptions.map(opt =>
                <option key={opt} value={opt}>
                  {opt === 0 ? 'All' : opt}
                </option>,
              )}
            </select>
          </div>

        </div>

        <div style={{
          maxWidth: '100',
          overflowX: 'scroll'
        }}>
          <Table
            className="table table-bordered"
            dataArray={page}
            columns={columns}
            keys={keys}
            buildRowOptions={buildRowOptions}
            sortBy={sortBy}
            onSort={onSort}
            style={{
              marginBottom: "0px"
            }}
            initialData={this.props.data.data}
          />
        </div>

        <div
          style={{
            display: "flex",
          }}
        >
          <Pagination
            className="pagination pull-right"
            currentPage={pageNumber}
            totalPages={totalPages}
            onChangePage={onPageNumberChange}
          />
        </div>

      </div >
    );
  }
}
