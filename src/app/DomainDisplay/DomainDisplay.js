import React, { Component } from 'react'
import "./DomainDisplay.css";
// import DataTable from '../../components/Table/DataTable';

import CVSpage from '../../components/Export/CSV/CSVpage'
import XLSpage from '../../components/Export/XLS/XLSpage'
import CVSall from '../../components/Export/CSV/CSVall'
import XLSall from '../../components/Export/XLS/XLSall'


// import ReactTable from "react-table";
import ReactTable from '../../components/ReactTable';
import "react-table/react-table.css";


class WeatherDisplay extends Component {
  state = {
    domainsNames: [],
    domainsData: [],

    sorted: [],
    page: 0,
    pageSize: 5,
    expanded: {},
    resized: [],
    filtered: [],
  };

  resetFiltered = () => {
    this.setState({
      // sorted: [],
      // page: 0,
      // pageSize: 10,
      // expanded: {},
      // resized: [],
      filtered: [],
    });
  }

  resetSorted = () => {
    this.setState({
      sorted: [],
      // page: 0,
      // pageSize: 10,
      // expanded: {},
      // resized: [],
      // filtered: [],
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("nextProps", nextProps, "\nprevState", prevState)
    if (nextProps.arrayOfDomainNames !== prevState.domainsNames)
      return {
        domainsNames: nextProps.arrayOfDomainNames,
      };
    else
      return null;
  }

  componentDidUpdate(prevProps) {
    this.loaderSpinner.style.display = 'none'
    if (prevProps.arrayOfDomainNames !== this.props.arrayOfDomainNames) {
      this.loaderSpinner.style.display = 'flex'
      this.apiRequestLoop(this.state.domainsNames.length).then(result =>
        this.setState(prevState => ({
          domainsData: {
            ...prevState.domainsData,
            result
          }
        }))
      )
    }
  }

  apiRequestLoop = inp => {
    let promiseArray = [];
    for (let i = 0; i < inp; i++) {
      let dataUrlLoop = "http://api.whoxy.com/?key=35145562f9994dc4eg985789f45a1c304&whois=" +
        this.state.domainsNames[i];
      promiseArray.push(
        fetch(dataUrlLoop)
          .then(response => response.json())
          .then(data => {
            return data;
          })
          .catch(error => {
            console.log(error.message)
          })
      );
    }
    return Promise.all(promiseArray)
  }

  render() {

    const Create = 'Create';
    const Update = 'Update';
    const Expiry = 'Expiry';
    const Registered = 'Registered';
    const Servers = 'Servers';
    const Domain = 'Domain';
    const Registrar = 'Registrar';
    const Company = 'Company';
    const Country = 'Country';
    const City = 'City';

    const paramsForDisplay = [
      Create,
      Update,
      Expiry,
      Registered,
      Servers,
      Domain,
      Registrar,
      Company,
      Country,
      City,
    ];

    const data = [];

    if (this.state.domainsData.result) {
      this.state.domainsData.result.forEach((item, i) => {
        try {
          data.push({
            id: i,
            name: item.domain_name === undefined ? 'no data' : item.domain_name,
            create: item.create_date === undefined ? 'no data' : item.create_date,
            update: item.update_date === undefined ? 'no data' : item.update_date,
            expiry: item.expiry_date === undefined ? 'no data' : item.expiry_date,
            registered: item.domain_registered === undefined ? 'no data' : item.domain_registered,
            servers: item.name_servers === undefined ? 'no data' : item.name_servers.join('\n'),
            domain: item.domain_status === undefined ? 'no data' : item.domain_status.join('\n'),
            registrar: item.domain_registrar === undefined || item.domain_registrar.registrar_name === undefined ? 'no data' : item.domain_registrar.registrar_name,
            company: item.registrant_contact === undefined || item.registrant_contact.company_name === undefined ? 'no data' : item.registrant_contact.company_name,
            country: item.registrant_contact === undefined || item.registrant_contact.country_name === undefined ? 'no data' : item.registrant_contact.country_name,
            city: item.registrant_contact === undefined || item.registrant_contact.city_name === undefined ? 'no data' : item.registrant_contact.city_name,
          });
        }
        catch (e) {
          console.log(e.message)
        }
      })
    }

    const columns = [
      { Header: 'Domain Name', accessor: 'name' },

      { Header: 'Create date', accessor: 'create', },
      { Header: 'Update date', accessor: 'update', },
      { Header: 'Expiry date', accessor: 'expiry', },
      { Header: 'Registered', accessor: 'registered', },
      { Header: 'Servers name', accessor: 'servers', },
      { Header: 'Domain status', accessor: 'domain', },
      { Header: 'Registrar name', accessor: 'registrar', },
      { Header: 'Company name', accessor: 'company', },
      { Header: 'Country name', accessor: 'country', },
      { Header: 'City name', accessor: 'city', },
    ];

    const removeItemInColumns = (key, value) => {
      if (value === undefined)
        return;

      for (let i in columns) {
        if (columns[i][key] === value) {
          columns.splice(i, 1);
        }
      }
    };

    const preparationForDisplay = value => {
      try {
        for (let p = 0; p < value.length; p++) {
          if (this.props[`is${value[p]}Choice`] === 'none') {

            columns.forEach(item => {
              if (item.Header.includes(value[p])) {
                removeItemInColumns("accessor", value[p].toLowerCase());
              }
            });

          }
        }
      }
      catch (e) {
        console.log(e.message)
      }
    }

    preparationForDisplay(paramsForDisplay)

    return (
      <>
        <div className="loader" ref={node => { this.loaderSpinner = node }} />

        <div className="buttons">

          <div className="CSV-ExportButtonsWrapper">
            <CVSpage
              label={'Export current page\nto CVS'}
              isCreateChoice={this.props.isCreateChoice}
              isUpdateChoice={this.props.isUpdateChoice}
              isExpiryChoice={this.props.isExpiryChoice}
              isRegisteredChoice={this.props.isRegisteredChoice}
              isServersChoice={this.props.isServersChoice}
              isDomainChoice={this.props.isDomainChoice}
              isRegistrarChoice={this.props.isRegistrarChoice}
              isCompanyChoice={this.props.isCompanyChoice}
              isCountryChoice={this.props.isCountryChoice}
              isCityChoice={this.props.isCityChoice}
            />
            <CVSall
              label={'Export all data\nto CVS'}
              isCreateChoice={this.props.isCreateChoice}
              isUpdateChoice={this.props.isUpdateChoice}
              isExpiryChoice={this.props.isExpiryChoice}
              isRegisteredChoice={this.props.isRegisteredChoice}
              isServersChoice={this.props.isServersChoice}
              isDomainChoice={this.props.isDomainChoice}
              isRegistrarChoice={this.props.isRegistrarChoice}
              isCompanyChoice={this.props.isCompanyChoice}
              isCountryChoice={this.props.isCountryChoice}
              isCityChoice={this.props.isCityChoice}
            />

          </div>

          <div className="reset-table">
            <button
              className="btn btn-primary"
              onClick={this.resetSorted}
              style={{
                whiteSpace: 'pre',
                outline: 'none',
                // backgroundColor: 'cornflowerblue',
              }}
            >
              {`Reset\nSort`}
            </button>

            <button
              className="btn btn-primary"
              onClick={this.resetFiltered}
              style={{
                whiteSpace: 'pre',
                outline: 'none',
                // backgroundColor: 'cornflowerblue',
              }}
            >
              {`Reset\nSearch`}
            </button>
          </div>

          <div className="XLS-ExportButtonsWrapper">
            <XLSpage
              label={'Export current page\nto XLS'}
              isCreateChoice={this.props.isCreateChoice}
              isUpdateChoice={this.props.isUpdateChoice}
              isExpiryChoice={this.props.isExpiryChoice}
              isRegisteredChoice={this.props.isRegisteredChoice}
              isServersChoice={this.props.isServersChoice}
              isDomainChoice={this.props.isDomainChoice}
              isRegistrarChoice={this.props.isRegistrarChoice}
              isCompanyChoice={this.props.isCompanyChoice}
              isCountryChoice={this.props.isCountryChoice}
              isCityChoice={this.props.isCityChoice}
            />
            <XLSall
              label={'Export all data\nto XLS'}
              isCreateChoice={this.props.isCreateChoice}
              isUpdateChoice={this.props.isUpdateChoice}
              isExpiryChoice={this.props.isExpiryChoice}
              isRegisteredChoice={this.props.isRegisteredChoice}
              isServersChoice={this.props.isServersChoice}
              isDomainChoice={this.props.isDomainChoice}
              isRegistrarChoice={this.props.isRegistrarChoice}
              isCompanyChoice={this.props.isCompanyChoice}
              isCountryChoice={this.props.isCountryChoice}
              isCityChoice={this.props.isCityChoice}
            />
          </div>
        </div>

        <ReactTable
          style={{ color: 'black' }}
          data={data}
          columns={columns}
          // pivotBy={["lastName"]}
          filterable
          defaultPageSize={5}
          className="-striped -highlight"
          // Controlled props
          sorted={this.state.sorted}
          page={this.state.page}
          pageSize={this.state.pageSize}
          expanded={this.state.expanded}
          resized={this.state.resized}
          filtered={this.state.filtered}
          // Callbacks
          onSortedChange={sorted => this.setState({ sorted })}
          onPageChange={page => this.setState({ page })}
          onPageSizeChange={(pageSize, page) =>
            this.setState({ page, pageSize })}
          onExpandedChange={expanded => this.setState({ expanded })}
          onResizedChange={resized => this.setState({ resized })}
          onFilteredChange={filtered => this.setState({ filtered })}
        />
      </>
    )
  }
}


export default WeatherDisplay;