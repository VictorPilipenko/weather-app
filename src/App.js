import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from './WeatherDisplay'

class App extends Component {
    state = {

        activePlace: 0,
        value: `London\nBerlin`,
        arrayOfCityNames: [],

        isTitleCurrentChoice: 'visible',
        isCheckedTitleCurrentChoice: true,

        isHightCurrentChoice: 'visible',
        isCheckedHightCurrentChoice: true,

        isLowCurrentChoice: 'visible',
        isCheckedLowCurrentChoice: true,
    }

    handleChange = e => this.setState({
        value: e.target.value
    });

    handleClick = e => {
        e.preventDefault();
        const arrayOfLines = this.state.value.split('\n');
        this.setState({
            arrayOfCityNames: arrayOfLines
        });
    }

    toggle = name => {
        this.state[`is${name}CurrentChoice`] === 'visible' ?
            this.setState({
                [`is${name}CurrentChoice`]: 'hidden',
            })
            :
            this.setState({
                [`is${name}CurrentChoice`]: 'visible',
            })

        this.setState({
            [`isChecked${name}CurrentChoice`]: !this.state[`isChecked${name}CurrentChoice`],
        });
    };

    render() {
        const Title = "Title";
        const Hight = "Hight";
        const Low = "Low";

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

                    <div className='header-flex-items-second'>
                        <input type="checkbox" id="current" name="current"
                            checked={this.state.isCheckedTitleCurrentChoice}
                            onClick={() => this.toggle(Title)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="current">Current</label>
                        <br />


                        <input type="checkbox" id="hight" name="hight"
                            checked={this.state.isCheckedHightCurrentChoice}
                            onClick={() => this.toggle(Hight)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="hight">Hight</label>
                        <br />


                        <input type="checkbox" id="low" name="low"
                            checked={this.state.isCheckedLowCurrentChoice}
                            onClick={() => this.toggle(Low)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="low">Low</label>
                    </div>
                </div>
                <div className="content">
                    <WeatherDisplay
                        arrayOfCityNames={this.state.arrayOfCityNames}

                        isTitleCurrentChoice={this.state.isTitleCurrentChoice}
                        isCheckedTitleCurrentChoice={this.state.isCheckedTitleCurrentChoice}

                        isHightCurrentChoice={this.state.isHightCurrentChoice}
                        isCheckedHightCurrentChoice={this.state.isCheckedHightCurrentChoice}

                        isLowCurrentChoice={this.state.isLowCurrentChoice}
                        isCheckedLowCurrentChoice={this.state.isCheckedLowCurrentChoice}
                    />
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