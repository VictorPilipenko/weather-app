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
        // console.log("nextProps", nextProps, "\nprevState", prevState)
        if (nextProps.arrayOfDomainNames !== prevState.domainsNames)
            return {
                domainsNames: nextProps.arrayOfDomainNames,
            };
        else
            return null;
    }

    componentDidUpdate(prevProps) {
        this.p.style.display = 'none'
        if (prevProps.arrayOfDomainNames !== this.props.arrayOfDomainNames) {
            this.p.style.display = 'flex'
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
                        // console.log(data)
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

        const data = [];
        const dataForCSV = [];
        const dataForExcel = [];

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

                    dataForCSV.push({
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

                    dataForExcel.push({
                        'Domain name': item.domain_name === undefined ? 'no data' : item.domain_name,
                        'Create date': item.create_date === undefined ? 'no data' : item.create_date,
                        'Update date': item.update_date === undefined ? 'no data' : item.update_date,
                        'Expiry date': item.expiry_date === undefined ? 'no data' : item.expiry_date,
                        "Registered": item.domain_registered === undefined ? 'no data' : item.domain_registered,
                        'Servers name': item.name_servers === undefined ? 'no data' : item.name_servers.join('\n'),
                        'Domain status': item.domain_status === undefined ? 'no data' : item.domain_status.join('\n'),
                        'Registrar name': item.domain_registrar === undefined || item.domain_registrar.registrar_name === undefined ? 'no data' : item.domain_registrar.registrar_name,
                        'Company name': item.registrant_contact === undefined || item.registrant_contact.company_name === undefined ? 'no data' : item.registrant_contact.company_name,
                        'Country name': item.registrant_contact === undefined || item.registrant_contact.country_name === undefined ? 'no data' : item.registrant_contact.country_name,
                        'City name': item.registrant_contact === undefined || item.registrant_contact.city_name === undefined ? 'no data' : item.registrant_contact.city_name,
                    });
                }
                catch (e) {
                    console.log(e.message)
                }
            })
        }

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

        const columns = [
            { title: 'Domain Name', prop: 'name' },

            { title: 'Create date', prop: 'create', display: this.props.isCreateChoice },
            { title: 'Update date', prop: 'update', display: this.props.isUpdateChoice },
            { title: 'Expiry date', prop: 'expiry', display: this.props.isExpiryChoice },
            { title: 'Registered', prop: 'registered', display: this.props.isRegisteredChoice },
            { title: 'Servers name', prop: 'servers', display: this.props.isServersChoice },
            { title: 'Domain status', prop: 'domain', display: this.props.isDomainChoice },
            { title: 'Registrar name', prop: 'registrar', display: this.props.isRegistrarChoice },
            { title: 'Company name', prop: 'company', display: this.props.isCompanyChoice },
            { title: 'Country name', prop: 'country', display: this.props.isCountryChoice },
            { title: 'City name', prop: 'city', display: this.props.isCityChoice },
        ];

        preparationForExport(paramsForExport);

        let xls = '';
        dataForExcel.length > 0 ? xls = new xlsExport(dataForExcel) : xls = new xlsExport([paramsForExport]);

        return (
            <>
                <div className="loader" ref={node => { this.p = node }} />

                <DataTable
                    keys="id"
                    columns={columns}
                    initialData={data}
                    initialPageLength={5}
                    // initialSortBy={{ prop: 'name', order: 'descending' }}
                    pageLengthOptions={[5, 20, 30]}
                />
                
                <div className="exportButtonsWrapper">

                    <CSVLink
                        filename={"domains.csv"}
                        data={dataForCSV}
                        headers={columnsForCVS}
                        className="btn btn-primary"
                    >
                        Export to CVS
                    </CSVLink>

                    <button
                        className="btn btn-primary"
                        onClick={
                            () => xls.exportToXLS('domains.xls')
                        }
                    >
                        Export to XLS
                    </button>

                </div>
            </>
        )
    }
}

export default WeatherDisplay