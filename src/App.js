import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from './WeatherDisplay'

class App extends Component {
    state = {
        activePlace: 0,
        value: `London\nBerlin`,
        myArray: []
    }

    handleChange = e => this.setState({
        value: e.target.value
    });

    handleClick = e => {
        e.preventDefault();
        const arrayOfLines = this.state.value.split('\n');
        this.setState({
            myArray: arrayOfLines
        });
    }

    render() {
        return (
            <div className="grid-container">
                <div className="header">
                    <div className="header-flex-items-first">
                        <textarea
                            value={this.state.value}
                            placeholder="Enter city name here"
                            onChange={this.handleChange}
                            cols={50}
                            rows={5}
                        />
                        <button className="button" onClick={this.handleClick} />
                    </div>
                </div>
                <div className="content">
                    <WeatherDisplay myArray={this.state.myArray} />
                </div>
                <div className="menu">
                    <div className="grid-container-menu">
                    </div>
                </div>
                <div className="footer">
                </div>
            </div>
        );
    }
}

export default App;