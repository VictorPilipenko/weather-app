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

        const data = [];
        const dataForCSV = [];
        const dataForExcel = [];

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

                // dataForExcel.push({
                //     'Name': item.name,
                //     'Current temp': item.main.temp,
                //     'High temp': item.main.temp_max,
                //     'Low temp': item.main.temp_min
                // });
            })
        }

        const preparationForExport = value => {
            let sss = 0;
            for (let i = 0; i < value.length; i++) {

                data.map(item => {

                    //default
                    dataForCSV.push({
                        name: item.name
                    });

                    dataForExcel.push({
                        'Name': item.name
                    });

                    if (this.props[`is${value[i]}Choice`] === 'visible') {
                        if (value[i] === Current) {
                            dataForCSV.push({
                                current: item.current,
                            });

                            dataForExcel.push({
                                'Current temp': item.current,
                            });
                        }

                        if (value[i] === High) {
                            dataForCSV.push({
                                high: item.high,
                            });

                            dataForExcel.push({
                                'High temp': item.high,
                            });
                        }

                        if (value[i] === Low) {
                            dataForCSV.push({
                                low: item.low
                            });

                            dataForExcel.push({
                                'Low temp': item.low
                            });
                        }
                    }

                })
            }
        }

        const columnsForCVS = [
            { label: 'Name', key: 'name' },
            { label: 'Current temp', key: 'current' },
            { label: 'High temp', key: 'high' },
            { label: 'Low temp', key: 'low' },
        ];

        const columns = [
            { title: 'Name', prop: 'name' },
            { title: 'Current temp', prop: 'current', visibility: this.props.isCurrentChoice },
            { title: 'High temp', prop: 'high', visibility: this.props.isHighChoice },
            { title: 'Low temp', prop: 'low', visibility: this.props.isLowChoice },
        ];

        // preparationForExport([Current, High, Low]);

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