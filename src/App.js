import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from './WeatherDisplay'

class App extends Component {
    state = {

        value: `London\nBerlin\nZaporizhzhya`,
        arrayOfCityNames: [],

        isCurrentChoice: 'visible',
        isCheckedCurrentChoice: true,

        isHighChoice: 'visible',
        isCheckedHighChoice: true,

        isLowChoice: 'visible',
        isCheckedLowChoice: true,
    }

    handleChange = e => this.setState({
        value: e.target.value
    });

    handleClick = e => {
        e.preventDefault();
        try {
            const arrayOfLines = this.state.value.split('\n');
            this.setState({
                arrayOfCityNames: arrayOfLines
            });
        }
        catch (e) {
            console.log(e)
        }
    }

    toggle = name => {
        this.state[`is${name}Choice`] === 'visible' ?
            this.setState({
                [`is${name}Choice`]: 'hidden',
            })
            :
            this.setState({
                [`is${name}Choice`]: 'visible',
            })

        this.setState({
            [`isChecked${name}Choice`]: !this.state[`isChecked${name}Choice`],
        });
    };

    render() {
        const Current = "Current";
        const High = "High";
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
                            checked={this.state.isCheckedCurrentChoice}
                            onClick={() => this.toggle(Current)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="current">Current</label>
                        <br />


                        <input type="checkbox" id="high" name="high"
                            checked={this.state.isCheckedHighChoice}
                            onClick={() => this.toggle(High)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="high">High</label>
                        <br />


                        <input type="checkbox" id="low" name="low"
                            checked={this.state.isCheckedLowChoice}
                            onClick={() => this.toggle(Low)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="low">Low</label>
                    </div>
                </div>
                <div className="content">
                    <WeatherDisplay
                        arrayOfCityNames={this.state.arrayOfCityNames}

                        isCurrentChoice={this.state.isCurrentChoice}
                        isCheckedCurrentChoice={this.state.isCheckedCurrentChoice}

                        isHighChoice={this.state.isHighChoice}
                        isCheckedHightChoice={this.state.isCheckedHightChoice}

                        isLowChoice={this.state.isLowChoice}
                        isCheckedLowChoice={this.state.isCheckedLowChoice}
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