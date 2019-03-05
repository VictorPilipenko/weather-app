import React, { Component } from 'react'
import "./css.css";
import DataTable from './Table/DataTable';

class WeatherDisplay extends Component {
    state = {
        weatherCity: null,
        weatherData: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("nextProps", nextProps, "\nprevState", prevState)
        if (nextProps.myArray !== prevState.weatherCity)
            return {
                weatherCity: nextProps.myArray,
            };
        else
            return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myArray !== this.props.myArray) {
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
        const data = [];
        if (this.state.weatherData.result) {
            this.state.weatherData.result.map((item, i) => {
                data.push({
                    id: i,
                    name: item.name,
                    current: item.main.temp,
                    high: item.main.temp_max,
                    low: item.main.temp_min
                });
            })
        }

        const columns = [
            { title: 'Name', prop: 'name' },
            { title: 'Current temp', prop: 'current', visibility: this.props.isTitleCurrentChoice },
            { title: 'High temp', prop: 'high', visibility: this.props.isHightCurrentChoice },
            { title: 'Low temp', prop: 'low', visibility: this.props.isLowCurrentChoice },
        ];
        return (
            <>
                <DataTable
                    className="container"
                    keys="id"
                    columns={columns}
                    initialData={data}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'current', order: 'descending' }}
                    pageLengthOptions={[5, 20, 50]}
                />
            </>
        )
    }
}

export default WeatherDisplay