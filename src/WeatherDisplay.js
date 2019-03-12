import React, { Component } from 'react'
import "./css.css";
import DataTable from './Table/DataTable';
import { CSVLink } from "react-csv";
import exportToExcel from './exportToExel';


class WeatherDisplay extends Component {
    state = {
        weatherCity: [],
        weatherData: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log("nextProps", nextProps, "\nprevState", prevState)
        if (nextProps.arrayOfCityNames !== prevState.weatherCity)
            return {
                weatherCity: nextProps.arrayOfCityNames,
            };
        else
            return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.arrayOfCityNames !== this.props.arrayOfCityNames) {
            this.apiRequestLoop(this.state.weatherCity.length).then(result =>
                this.setState(prevState => (
                    { weatherData: { ...prevState.weatherData, result } }
                ))
            )
        }
    }

    apiRequestLoop = inp => {
        let promiseArray = [];
        for (let i = 0; i < inp; i++) {
            let dataUrlLoop = "http://api.openweathermap.org/data/2.5/weather?q=" +
                this.state.weatherCity[i] +
                "&APPID=b1b35bba8b434a28a0be2a3e1071ae5b";
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
        const Current = "Current";
        const High = "High";
        const Low = "Low";
        const paramsForExport = [Current, High, Low];

        const data = [];
        const dataForCSV = [];
        const dataForExcel = [];

        let columnsForCVS = [
            { label: 'Name', key: 'name' },
            { label: 'Current temp', key: 'current' },
            { label: 'High temp', key: 'high' },
            { label: 'Low temp', key: 'low' },
        ];

        if (this.state.weatherData.result) {
            this.state.weatherData.result.map((item, i) => {
                data.push({
                    id: i,
                    name: item.name,
                    current: item.main.temp,
                    high: item.main.temp_max,
                    low: item.main.temp_min
                });

                dataForCSV.push({
                    name: item.name,
                    current: item.main.temp,
                    high: item.main.temp_max,
                    low: item.main.temp_min
                });

                dataForExcel.push({
                    'Name': item.name,
                    'Current temp': item.main.temp,
                    'High temp': item.main.temp_max,
                    'Low temp': item.main.temp_min
                });
            })
        }

        Object.prototype.removeItem = function (key, value) {
            if (value == undefined)
                return;

            for (var i in this) {
                if (this[i][key] == value) {
                    this.splice(i, 1);
                }
            }
        };

        // value[p]=Low; columnsForCVS = [{ key: 'low' }]
        const preparationForExport = value => {
            for (let p = 0; p < value.length; p++) {
                if (this.props[`is${value[p]}Choice`] === 'hidden') {

                    dataForCSV.map(item => {
                        if (value[p] === Current) {
                            delete item.current
                        }
                        else if (value[p] === High) {
                            delete item.high
                        }
                        else if (value[p] === Low) {
                            delete item.low
                        }
                    });

                    columnsForCVS.map(item => {
                        if (item.label.includes(value[p])) {
                            columnsForCVS.removeItem("key", value[p].toLowerCase());
                        }
                    });

                    dataForExcel.map(item => {
                        if (value[p] === Current) {
                            delete item[`Current temp`]
                        }
                        else if (value[p] === High) {
                            delete item[`High temp`]
                        }
                        else if (value[p] === Low) {
                            delete item[`Low temp`]
                        }
                    });

                }
            }
            console.log(dataForCSV)
            console.log(columnsForCVS)
            console.log(dataForExcel)
        }

        const columns = [
            { title: 'Name', prop: 'name' },
            { title: 'Current temp', prop: 'current', visibility: this.props.isCurrentChoice },
            { title: 'High temp', prop: 'high', visibility: this.props.isHighChoice },
            { title: 'Low temp', prop: 'low', visibility: this.props.isLowChoice },
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
                    initialSortBy={{ prop: 'name', order: 'descending' }}
                    pageLengthOptions={[5, 20, 50]}
                />

                <CSVLink data={dataForCSV} headers={columnsForCVS} style={{ margin: "10px" }}>
                    Download CVS
                </CSVLink>

                <button onClick={() => exportToExcel(dataForExcel)}>
                    Export to excel :)
                </button>
            </>
        )
    }
}

export default WeatherDisplay