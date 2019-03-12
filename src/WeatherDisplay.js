import React, { Component } from 'react'
import "./WeatherDisplay.css";
import DataTable from './Table/DataTable';
import { CSVLink } from "react-csv";
import exportToExcel from './exportToExel';


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
        if (prevProps.arrayOfDomainNames !== this.props.arrayOfDomainNames) {
            this.apiRequestLoop(this.state.domainsNames.length).then(result =>
                this.setState(prevState => (
                    { domainsData: { ...prevState.domainsData, result } }
                ))
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
        const Create = "Create";
        const Update = "Update";
        const Expiry = "Expiry";
        const paramsForExport = [Create, Update, Expiry];

        const data = [];
        const dataForCSV = [];
        const dataForExcel = [];

        let columnsForCVS = [
            { label: 'Name', key: 'name' },
            { label: 'Create date', key: 'create' },
            { label: 'Update date', key: 'update' },
            { label: 'Expiry date', key: 'expiry' },
        ];

        if (this.state.domainsData.result) {
            this.state.domainsData.result.map((item, i) => {
                try {
                    data.push({
                        id: i,
                        name: item.domain_name,
                        create: item.create_date,
                        update: item.update_date,
                        expiry: item.expiry_date
                    });

                    dataForCSV.push({
                        name: item.domain_name,
                        create: item.create_date,
                        update: item.update_date,
                        expiry: item.expiry_date
                    });

                    dataForExcel.push({
                        'Domain name': item.domain_name,
                        'Create date': item.create_date,
                        'Update date': item.update_date,
                        'Expiry date': item.expiry_date
                    });

                    console.log(data)

                }
                catch{
                    console.log("error")
                }
            })
        }

        Object.prototype.removeItem = function (key, value) {
            if (value === undefined)
                return;

            for (var i in this) {
                if (this[i][key] === value) {
                    this.splice(i, 1);
                }
            }
        };

        // for example: value[p]=Low; columnsForCVS = [{ label: 'Low temp', key: 'low' }]
        // value[p] должно совпадать с key
        const preparationForExport = value => {
            try {
                for (let p = 0; p < value.length; p++) {
                    if (this.props[`is${value[p]}Choice`] === 'hidden') {

                        dataForCSV.map(item => {
                            if (value[p] === Create) {
                                delete item.create
                            }
                            else if (value[p] === Update) {
                                delete item.update
                            }
                            else if (value[p] === Expiry) {
                                delete item.expiry
                            }
                        });

                        columnsForCVS.map(item => {
                            if (item.label.includes(value[p])) {
                                columnsForCVS.removeItem("key", value[p].toLowerCase());
                            }
                        });

                        dataForExcel.map(item => {
                            if (value[p] === Create) {
                                delete item[`Create date`]
                            }
                            else if (value[p] === Update) {
                                delete item[`Update date`]
                            }
                            else if (value[p] === Expiry) {
                                delete item[`Expiry date`]
                            }
                        });

                    }
                }
            }
            catch{
                console.log("error")
            }
            // console.log(dataForCSV)
            // console.log(columnsForCVS)
            // console.log(dataForExcel)
        }

        const columns = [
            { title: 'Domain Name', prop: 'name' },

            { title: 'Create date', prop: 'create', visibility: this.props.isCreateChoice },
            { title: 'Update date', prop: 'update', visibility: this.props.isUpdateChoice },
            { title: 'Expiry date', prop: 'expiry', visibility: this.props.isExpiryChoice },
        ];

        preparationForExport(paramsForExport);

        return (
            <>
                <DataTable
                    className="container"
                    keys="id"
                    columns={columns}
                    initialData={data}
                    initialPageLength={5}
                    // initialSortBy={{ prop: 'name', order: 'descending' }}
                    pageLengthOptions={[5, 20, 50]}
                />

                <div className="exportButtonsWrapper">

                    <CSVLink
                        filename={"domains.csv"}
                        data={dataForCSV}
                        headers={columnsForCVS}
                        className="btn btn-primary exportToCSVButton"
                    >
                        Download CVS
                    </CSVLink>

                    <a className="btn btn-primary exportToExcelButton" onClick={() => exportToExcel(dataForExcel)}>
                        Export to excel :)
                    </a>
                </div>
            </>
        )
    }
}

export default WeatherDisplay