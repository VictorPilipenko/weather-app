import React, { Component } from 'react'
import "./WeatherDisplay.css";
import DataTable from './Table/DataTable';
import { CSVLink } from "react-csv";
import xlsExport from 'xlsexport';

class WeatherDisplay extends Component {
    state = {
        domainsNames: [],
        domainsData: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("nextProps", nextProps, "\nprevState", prevState)
        if (nextProps.arrayOfDomainNames !== prevState.domainsNames)
            return {
                domainsNames: nextProps.arrayOfDomainNames,
            };
        else
            return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.arrayOfDomainNames !== this.props.arrayOfDomainNames) {
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
                        console.log(data)
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
        const Create = "Create";
        const Update = "Update";
        const Expiry = "Expiry";
        const Registrar = "Registrar";
        const Servers = 'Servers';
        const Domain = 'Domain'
        const paramsForExport = [Create, Update, Expiry, Registrar, Servers, Domain];

        const data = [];
        const dataForCSV = [];
        const dataForExcel = [];

        let columnsForCVS = [
            { label: 'Name', key: 'name' },
            { label: 'Create date', key: 'create' },
            { label: 'Update date', key: 'update' },
            { label: 'Expiry date', key: 'expiry' },
            { label: 'Registrar name', key: 'registrar' },
            { label: 'Servers', key: 'servers' },
            { label: 'Domain status', key: 'domain' },
        ];

        if (this.state.domainsData.result) {
            this.state.domainsData.result.forEach((item, i) => {
                try {
                    data.push({
                        id: i,
                        name: item.domain_name,
                        create: item.create_date,
                        update: item.update_date,
                        expiry: item.expiry_date,
                        registrar: item.domain_registrar.registrar_name,
                        servers: item.name_servers.join('\n'),
                        domain: item.domain_status.join('\n'),

                    });

                    dataForCSV.push({
                        name: item.domain_name,
                        create: item.create_date,
                        update: item.update_date,
                        expiry: item.expiry_date,
                        registrar: item.domain_registrar.registrar_name,
                        servers: item.name_servers,
                        domain: item.domain_status,
                    });

                    dataForExcel.push({
                        'Domain name': item.domain_name,
                        'Create date': item.create_date,
                        'Update date': item.update_date,
                        'Expiry date': item.expiry_date,
                        'Registrar name': item.domain_registrar.registrar_name,
                        'Servers': item.name_servers,
                        'Domain status': item.domain_status,
                    });
                }
                catch{
                    console.log("error")
                }
            })
        }

        function removeItemInColumnsForCVS(key, value) {
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

                        dataForCSV.forEach(item => {
                            if (value[p] === Create) {
                                delete item.create
                            }
                            else if (value[p] === Update) {
                                delete item.update
                            }
                            else if (value[p] === Expiry) {
                                delete item.expiry
                            }
                            else if (value[p] === Registrar) {
                                delete item.registrar
                            }
                            else if (value[p] === Servers) {
                                delete item.servers
                            }
                            else if (value[p] === Domain) {
                                delete item.domain
                            }
                        });

                        columnsForCVS.forEach(item => {
                            if (item.label.includes(value[p])) {
                                removeItemInColumnsForCVS("key", value[p].toLowerCase());
                            }
                        });

                        dataForExcel.forEach(item => {
                            if (value[p] === Create) {
                                delete item[`Create date`]
                            }
                            else if (value[p] === Update) {
                                delete item[`Update date`]
                            }
                            else if (value[p] === Expiry) {
                                delete item[`Expiry date`]
                            }
                            else if (value[p] === Registrar) {
                                delete item[`Registrar name`]
                            }
                            else if (value[p] === Servers) {
                                delete item[`Servers`]
                            }
                            else if (value[p] === Domain) {
                                delete item[`Domain status`]
                            }
                        });
                    }
                }
            }
            catch{
                console.log("error")
            }
        }

        const columns = [
            { title: 'Domain Name', prop: 'name' },

            { title: 'Create date', prop: 'create', display: this.props.isCreateChoice },
            { title: 'Update date', prop: 'update', display: this.props.isUpdateChoice },
            { title: 'Expiry date', prop: 'expiry', display: this.props.isExpiryChoice },
            { title: 'Registrar name', prop: 'registrar', display: this.props.isRegistrarChoice },
            { title: 'Servers', prop: 'servers', display: this.props.isServersChoice },
            { title: 'Domain status', prop: 'domain', display: this.props.isDomainChoice },
        ];

        preparationForExport(paramsForExport);

        const xls = new xlsExport(dataForExcel);

        // console.log(columnsForCVS)
        // const columnsForCVS_copy = JSON.parse(JSON.stringify(columnsForCVS));
        // console.log(columnsForCVS_copy)

        return (
            <>
                <DataTable
                    className="container"
                    keys="id"
                    columns={columns}
                    initialData={data}
                    initialPageLength={5}
                    // initialSortBy={{ prop: 'name', order: 'descending' }}
                    pageLengthOptions={[2, 3, 5]}
                />

                <div className="exportButtonsWrapper">

                    <CSVLink
                        filename={"domains.csv"}
                        data={dataForCSV}
                        headers={columnsForCVS}
                        className="btn btn-primary"
                    >
                        Download CVS
                    </CSVLink>

                    <button
                        className="btn btn-primary"
                        onClick={
                            () => xls.exportToXLS('domains.xls')
                        }
                    >
                        Export to excel :)
                    </button>

                </div>
            </>
        )
    }
}

export default WeatherDisplay