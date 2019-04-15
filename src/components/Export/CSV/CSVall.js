import React from 'react'
import { connect } from 'react-redux';
import { CSVLink } from "react-csv";

class CSVall extends React.Component {
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

    const paramsForExport = [
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

    let dataFromStore = this.props.dataFromStore

    // console.log(dataFromStore);

    dataFromStore.forEach(item => {
      delete item._index;
      delete item._nestingLevel;
      delete item._original;
      delete item._subRows;
      delete item._viewIndex;
    });

    const removeItemInColumnsForCVS = (key, value) => {
      if (value === undefined)
        return;

      for (let i in columnsForCVS) {
        if (columnsForCVS[i][key] === value) {
          columnsForCVS.splice(i, 1);
        }
      }
    };

    // for example: value[p]=Low; columnsForCVS = [{ label: 'Low temp', key: 'low' }]
    // value[p] должно совпадать с key
    const preparationForExport = value => {
      try {
        for (let p = 0; p < value.length; p++) {
          if (this.props[`is${value[p]}Choice`] === 'none') {

            dataFromStore.forEach(item => {
              if (value[p] === Create) {
                delete item.create
              }
              else if (value[p] === Update) {
                delete item.update
              }
              else if (value[p] === Expiry) {
                delete item.expiry
              }
              else if (value[p] === Registered) {
                delete item.registered
              }
              else if (value[p] === Servers) {
                delete item.servers
              }
              else if (value[p] === Domain) {
                delete item.domain
              }
              else if (value[p] === Registrar) {
                delete item.registrar
              }
              else if (value[p] === Company) {
                delete item.company
              }
              else if (value[p] === Country) {
                delete item.country
              }
              else if (value[p] === City) {
                delete item.city
              }

              else if (value[p] === Issuer) {
                delete item.issuer
              }
              else if (value[p] === Days) {
                delete item.days
              }
              else if (value[p] === From) {
                delete item.from
              }
              else if (value[p] === To) {
                delete item.to
              }
            });

            columnsForCVS.forEach(item => {
              if (item.label.includes(value[p])) {
                removeItemInColumnsForCVS("key", value[p].toLowerCase());
              }
            });

          }
        }
      }
      catch (e) {
        console.log(e.message)
      }
    }

    preparationForExport(paramsForExport)

    return (
      <CSVLink
        filename={"domains.csv"}
        data={dataFromStore}
        headers={columnsForCVS}
        className="btn btn-primary"
        style={{ whiteSpace: "pre", outline: 'none' }}
      >
        {this.props.label}
      </CSVLink>
    )
  }
}

const mapStateToProps = store => {
  // console.log(store.dataAll)
  return {
    dataFromStore: store.dataAll
  }
}

export default connect(mapStateToProps)(CSVall);