import React from 'react'
import { connect } from 'react-redux';
import xlsExport from 'xlsexport';

class XLSpage extends React.Component {
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

        let data = this.props.data
        let dataFromStore = this.props.dataFromStore


        // for example: value[p]=Low; columnsForCVS = [{ label: 'Low temp', key: 'low' }]
        // value[p] должно совпадать с key
        const preparationForExport = value => {
            try {
                for (let p = 0; p < value.length; p++) {
                    if (this.props[`is${value[p]}Choice`] === 'none') {

                        data.forEach(item => {
                            if (value[p] === Create) {
                                delete item[`Create date`]
                            }
                            else if (value[p] === Update) {
                                delete item[`Update date`]
                            }
                            else if (value[p] === Expiry) {
                                delete item[`Expiry date`]
                            }
                            else if (value[p] === Registered) {
                                delete item['Registered']
                            }
                            else if (value[p] === Servers) {
                                delete item[`Servers`]
                            }
                            else if (value[p] === Domain) {
                                delete item[`Domain status`]
                            }
                            else if (value[p] === Registrar) {
                                delete item[`Registrar name`]
                            }
                            else if (value[p] === Company) {
                                delete item[`Company name`]
                            }
                            else if (value[p] === Country) {
                                delete item['Country name']
                            }
                            else if (value[p] === City) {
                                delete item['City name']
                            }
                        });

                        dataFromStore.forEach(item => {
                            if (value[p] === Create) {
                                delete item[`Create date`]
                            }
                            else if (value[p] === Update) {
                                delete item[`Update date`]
                            }
                            else if (value[p] === Expiry) {
                                delete item[`Expiry date`]
                            }
                            else if (value[p] === Registered) {
                                delete item['Registered']
                            }
                            else if (value[p] === Servers) {
                                delete item[`Servers`]
                            }
                            else if (value[p] === Domain) {
                                delete item[`Domain status`]
                            }
                            else if (value[p] === Registrar) {
                                delete item[`Registrar name`]
                            }
                            else if (value[p] === Company) {
                                delete item[`Company name`]
                            }
                            else if (value[p] === Country) {
                                delete item['Country name']
                            }
                            else if (value[p] === City) {
                                delete item['City name']
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

        let xlsData = '';
        data.length > 0 ? xlsData = new xlsExport(data) : xlsData = new xlsExport([paramsForExport]);

        let xlsDataFromStore = '';
        data.length > 0 ? xlsDataFromStore = new xlsExport(dataFromStore) : xlsDataFromStore = new xlsExport([paramsForExport]);


        return (
            <>
                {this.props.data !== this.props.dataFromStore ?

                    <button
                        className="btn btn-primary"
                        style={{whiteSpace:"pre"}}
                        onClick={
                            () => xlsDataFromStore.exportToXLS('domains.xls')
                        }
                    >
                        {this.props.label}
                    </button>

                    :

                    <button
                        className="btn btn-primary"
                        style={{whiteSpace:"pre"}}
                        onClick={
                            () => xlsData.exportToXLS('domains.xls')
                        }
                    >
                        {this.props.label}
                    </button>

                }
            </>
        )
    }
}

const mapStateToProps = store => {
    // console.log(store)
    return {
        dataFromStore: store.dataPage
    }
}

export default connect(mapStateToProps)(XLSpage);