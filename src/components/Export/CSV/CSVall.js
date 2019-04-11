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
        ];

        let data = this.props.data
        let dataFromStore = this.props.dataFromStore

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

                        data.forEach(item => {
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
                        });

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
            <>
                {this.props.data !== this.props.dataFromStore ?

                    <CSVLink
                        filename={"domains.csv"}
                        data={dataFromStore}
                        headers={this.props.headers}
                        className="btn btn-primary"
                        style={{whiteSpace:"pre"}}
                    >
                        {this.props.label}
                    </CSVLink>

                    :

                    <CSVLink
                        filename={"domains.csv"}
                        data={data}
                        headers={this.props.headers}
                        className="btn btn-primary"
                        style={{whiteSpace:"pre"}}
                    >
                        {this.props.label}
                    </CSVLink>

                }
            </>
        )
    }
}

const mapStateToProps = store => {
    console.log(store.dataAll)
    return {
        dataFromStore: store.dataAll
    }
}

export default connect(mapStateToProps)(CSVall);