import React, { Component } from 'react'
import "./DomainDisplay.css";

import CVSpage from '../../components/Export/CSV/CSVpage'
import XLSpage from '../../components/Export/XLS/XLSpage'
import CVSall from '../../components/Export/CSV/CSVall'
import XLSall from '../../components/Export/XLS/XLSall'

import ReactTable from '../../components/ReactTable';
import "../../components/ReactTable/react-table.css";


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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    for (let i = 0; i < inp; i++) {

      let whoxyUrlLoop = "http://api.whoxy.com/?key=35145562f9994dc4eg985789f45a1c304&whois=" +
        this.state.domainsNames[i];
      let sslUrlLoop = "https://endpoint.apivoid.com/sslinfo/v1/pay-as-you-go/?key=c028bf0b1127e7a2494c038144285a9e53b3f51e&host=" +
        this.state.domainsNames[i];

      promiseArray.push(
        fetch(whoxyUrlLoop)
          .then(response => response.json())
          .then(data1 =>

            fetch(proxyurl + sslUrlLoop)
              .then(response => response.json())
              .then(data2 => {
                return Object.assign(data1, data2);
              })
              .catch(error => {
                console.log(error.message)
              })

          )
          .catch(error => {
            console.log(error.message)
          }),
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
    const Issuer = 'Issuer';
    const Days = 'Days';
    const From = 'From';
    const To = 'To';

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
      Issuer,
      Days,
      From,
      To,
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

            issuer: item.data === undefined ||
              item.data.certificate === undefined ||
              item.data.certificate.details === undefined ||
              item.data.certificate.details.issuer === undefined ||
              item.data.certificate.details.issuer.common_name === undefined
              ? 'no data' : item.data.certificate.details.issuer.common_name,
            days: item.data === undefined ||
              item.data.certificate === undefined ||
              item.data.certificate.details === undefined ||
              item.data.certificate.details.validity === undefined ||
              item.data.certificate.details.validity.days_left === undefined
              ? 'no data' : item.data.certificate.details.validity.days_left,
            from: item.data === undefined ||
              item.data.certificate === undefined ||
              item.data.certificate.details === undefined ||
              item.data.certificate.details.validity === undefined ||
              item.data.certificate.details.validity.valid_from === undefined
              ? 'no data' : item.data.certificate.details.validity.valid_from,
            to: item.data === undefined ||
              item.data.certificate === undefined ||
              item.data.certificate.details === undefined ||
              item.data.certificate.details.validity === undefined ||
              item.data.certificate.details.validity.valid_to === undefined
              ? 'no data' : item.data.certificate.details.validity.valid_to,
          });
        }
        catch (e) {
          console.log(e.message)
        }
      })
    }

    let columnsForCVS = [
      { label: 'Name', key: 'name' },
      { label: 'Create date', key: 'create' },
      { label: 'Update date', key: 'update' },
      { label: 'Expiry date', key: 'expiry' },
      { label: 'Registered', key: 'registered' },
      { label: 'Servers name', key: 'servers' },
      { label: 'Domain status', key: 'domain' },
      { label: 'Registrar name', key: 'registrar' },
      { label: 'Company name', key: 'company' },
      { label: 'Country name', key: 'country' },
      { label: 'City name', key: 'city' },
      { label: 'Issuer name', key: 'issuer', },
      { label: 'Days left', key: 'days', },
      { label: 'From', key: 'from', },
      { label: 'To', key: 'to', },
    ];

    const domain = [
      { Header: 'Domain Name', accessor: 'name' },
    ];

    const timeStamps = [
      { Header: 'Create date', accessor: 'create', },
      { Header: 'Update date', accessor: 'update', },
      { Header: 'Expiry date', accessor: 'expiry', },
    ];

    const status = [
      { Header: 'Registered', accessor: 'registered', },
      { Header: 'Servers name', accessor: 'servers', },
      { Header: 'Domain status', accessor: 'domain', },
    ]
    const located = [
      { Header: 'Registrar name', accessor: 'registrar', },
      { Header: 'Company name', accessor: 'company', },
      { Header: 'Country name', accessor: 'country', },
      { Header: 'City name', accessor: 'city', },
    ];

    const ssl = [
      { Header: 'Issuer name', accessor: 'issuer', },
      { Header: 'Days left', accessor: 'days', },
      { Header: 'From date', accessor: 'from', },
      { Header: 'To date', accessor: 'to', },
    ];

    const columns = [
      { Header: 'Domain', columns: domain },
      { Header: 'Time Stamps', columns: timeStamps },
      { Header: 'Status', columns: status },
      { Header: 'Located', columns: located },
      { Header: 'SSL Checker', columns: ssl }
    ];

    const removeItemInColumns = (key, value, body) => {
      if (value === undefined)
        return;

      for (let i in body) {
        if (body[i][key] === value) {
          body.splice(i, 1);
        }
      }
    };

    const preparationForDisplay = value => {
      try {
        for (let p = 0; p < value.length; p++) {
          if (!this.props[`is${value[p]}Choice`]) {

            timeStamps.forEach(item => {
              if (item.Header.includes(value[p])) {
                removeItemInColumns("accessor", value[p].toLowerCase(), timeStamps);
              }
            });

            status.forEach(item => {
              if (item.Header.includes(value[p])) {
                removeItemInColumns("accessor", value[p].toLowerCase(), status);
              }
            });

            located.forEach(item => {
              if (item.Header.includes(value[p])) {
                removeItemInColumns("accessor", value[p].toLowerCase(), located);
              }
            });

            ssl.forEach(item => {
              if (item.Header.includes(value[p])) {
                removeItemInColumns("accessor", value[p].toLowerCase(), ssl);
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

              isIssuerChoice={this.props.isIssuerChoice}
              isDaysChoice={this.props.isDaysChoice}
              isFromChoice={this.props.isFromChoice}
              isToChoice={this.props.isToChoice}

              paramsForExport={paramsForDisplay}
              columnsForCVS={columnsForCVS}
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

              isIssuerChoice={this.props.isIssuerChoice}
              isDaysChoice={this.props.isDaysChoice}
              isFromChoice={this.props.isFromChoice}
              isToChoice={this.props.isToChoice}

              paramsForExport={paramsForDisplay}
              columnsForCVS={columnsForCVS}
            />

          </div>

          <div className="reset-table">
            <button
              className="btn btn-primary"
              onClick={this.resetSorted}
            // style={{
            //   whiteSpace: 'pre',
            //   outline: 'none',
            // }}
            >
              {`Reset\nSort`}
            </button>

            <button
              className="btn btn-primary"
              onClick={this.resetFiltered}
            // style={{
            //   whiteSpace: 'pre',
            //   outline: 'none',
            // }}
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

              isIssuerChoice={this.props.isIssuerChoice}
              isDaysChoice={this.props.isDaysChoice}
              isFromChoice={this.props.isFromChoice}
              isToChoice={this.props.isToChoice}

              paramsForExport={paramsForDisplay}
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

              isIssuerChoice={this.props.isIssuerChoice}
              isDaysChoice={this.props.isDaysChoice}
              isFromChoice={this.props.isFromChoice}
              isToChoice={this.props.isToChoice}

              paramsForExport={paramsForDisplay}
            />
          </div>
        </div>

        <ReactTable
          style={{ color: 'black' }}
          data={data}
          columns={columns}
          // pivotBy={["lastName"]}
          filterable
          defaultPageSize={10}
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