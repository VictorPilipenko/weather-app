import React, { Component } from 'react'
import "./WeatherDisplay.css";
import DataTable from './Table/DataTable';

import CVSpage from './CSVpage'
import XLSpage from './XLSpage'
import CVSall from './CSVall'
import XLSall from './XLSall'

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
        // console.log(this.props.dataGet);
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



        return (
            <>
                <div className="loader" ref={node => { this.loaderSpinner = node }} />

                <DataTable
                    keys="id"
                    columns={columns}
                    initialData={data}
                    initialPageLength={5}
                    // initialSortBy={{ prop: 'name', order: 'descending' }}
                    pageLengthOptions={[5, 20, 30]}
                />

                <div className="exportButtonsWrapper">

                    <CVSpage
                        data={dataForCSV}
                        headers={columnsForCVS}
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

                    <XLSpage
                        data={dataForExcel}
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

                </div>

                <div className="exportButtonsWrapper">

                    <CVSall
                        data={dataForCSV}
                        headers={columnsForCVS}
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

                    <XLSall
                        data={dataForExcel}
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
            </>
        )
    }
}


export default WeatherDisplay;