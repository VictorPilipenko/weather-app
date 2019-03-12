import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from './WeatherDisplay'

class App extends Component {
    state = {

        value: `google.com\nstackoverflow.com`,
        arrayOfDomainNames: [],

        isCreateChoice: 'visible',
        isCheckedCreateChoice: true,

        isUpdateChoice: 'visible',
        isCheckedUpdateChoice: true,

        isExpiryChoice: 'visible',
        isCheckedExpiryChoice: true,
    }

    handleChange = e => this.setState({
        value: e.target.value
    });

    handleClick = e => {
        e.preventDefault();
        try {
            const arrayOfLines = this.state.value.split('\n');
            let clearArrayOfLines = arrayOfLines.filter(element => element !== "");
            this.setState({
                arrayOfDomainNames: clearArrayOfLines
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
        const Create = "Create";
        const Update = "Update";
        const Expiry = "Expiry";


        return (
            <div className="grid-container">
                <div className="header">
                    <div className="header-flex-items-first">
                        {/* три пробела перед и после*/}
                        <span className="legendForTextarea">{'\u00A0'}{'\u00A0'}{'\u00A0'}Add domains{'\u00A0'}{'\u00A0'}{'\u00A0'}</span>
                        <textarea
                            value={this.state.value}
                            placeholder="...one per line"
                            onChange={this.handleChange}
                            cols={50}
                            rows={5}
                            className="textArea"
                        />
                        <div className="buttonWrapper">
                            <p className="countCities">{this.state.arrayOfDomainNames.length} domains added</p>
                            <button className="buttonGetDomains" onClick={this.handleClick}>Push</button>
                        </div>

                    </div>

                    <div className='header-flex-items-second'>


                        <input type="checkbox" id="create" name="create"
                            checked={this.state.isCheckedCreateChoice}
                            onClick={() => this.toggle(Create)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="create">Create</label>
                        <br />


                        <input type="checkbox" id="update" name="update"
                            checked={this.state.isCheckedUpdateChoice}
                            onClick={() => this.toggle(Update)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="update">Update</label>
                        <br />


                        <input type="checkbox" id="expiry" name="expiry"
                            checked={this.state.isCheckedExpiryChoice}
                            onClick={() => this.toggle(Expiry)}
                        />
                        <label style={{ color: 'cadetblue', margin: '10px' }} for="expiry">Expiry</label>


                    </div>
                </div>
                <div className="content">
                    <WeatherDisplay
                        arrayOfDomainNames={this.state.arrayOfDomainNames}

                        isCreateChoice={this.state.isCreateChoice}
                        isUpdateChoice={this.state.isUpdateChoice}
                        isExpiryChoice={this.state.isExpiryChoice}
                    />
                </div>
                <div className="menu">
                    <div className="grid-container-menu">
                        {/* <div class="banner">
                            <div class="animated">
                                <div class="text1">Только в этом месяце</div>
                                <div class="text2">Скидки по 20%</div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="footer">
                </div>
            </div>
        );
    }
}

export default App;