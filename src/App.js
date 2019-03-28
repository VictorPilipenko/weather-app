import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from './WeatherDisplay'
import logo from './Logo_Final-01.png'

class App extends Component {
    state = {

        // value: `google.com\ntrello.com\ngithub.com\nstackoverflow.com\nhabr.com`,
        value: '',
        arrayOfDomainNames: [],

        isCreateChoice: 'table-cell',
        isCheckedCreateChoice: true,

        isUpdateChoice: 'table-cell',
        isCheckedUpdateChoice: true,

        isExpiryChoice: 'table-cell',
        isCheckedExpiryChoice: true,

        isRegisteredChoice: 'table-cell',
        isCheckedRegisteredChoice: true,

        isServersChoice: 'table-cell',
        isCheckedServersChoice: true,

        isDomainChoice: 'table-cell',
        isCheckedDomainChoice: true,

        isRegistrarChoice: 'table-cell',
        isCheckedRegistrarChoice: true,

        isCompanyChoice: 'table-cell',
        isCheckedCompanyChoice: true,

        isCountryChoice: 'table-cell',
        isCheckedCountryChoice: true,

        isCityChoice: 'table-cell',
        isCheckedCityChoice: true,
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
            console.log(e.message)
        }
    }

    toggle = name => {
        this.state[`is${name}Choice`] === 'table-cell' ?
            this.setState({
                [`is${name}Choice`]: 'none',
            })
            :
            this.setState({
                [`is${name}Choice`]: 'table-cell',
            })

        this.setState({
            [`isChecked${name}Choice`]: !this.state[`isChecked${name}Choice`],
        });
    };

    render() {
        const Create = 'Create';
        const Update = 'Update';
        const Expiry = 'Expiry';
        const Registrar = 'Registrar';
        const Servers = 'Servers';
        const Domain = 'Domain';
        const Company = 'Company';
        const Country = 'Country';
        const Registered = 'Registered';
        const City = 'City';

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
                            className="textArea"
                            spellCheck="false"
                        />
                        <div className="buttonWrapper">
                            <p className="countCities">{this.state.arrayOfDomainNames.length} domains added</p>
                            <button className="btn btn-primary buttonGetDomains" onClick={this.handleClick}>Push</button>
                        </div>

                        <img className="logo" src={logo} alt="logo" />
                    </div>

                </div>
                <div className="content">
                    <WeatherDisplay
                        arrayOfDomainNames={this.state.arrayOfDomainNames}

                        isCreateChoice={this.state.isCreateChoice}
                        isUpdateChoice={this.state.isUpdateChoice}
                        isExpiryChoice={this.state.isExpiryChoice}
                        isRegisteredChoice={this.state.isRegisteredChoice}
                        isServersChoice={this.state.isServersChoice}
                        isDomainChoice={this.state.isDomainChoice}
                        isRegistrarChoice={this.state.isRegistrarChoice}
                        isCompanyChoice={this.state.isCompanyChoice}
                        isCountryChoice={this.state.isCountryChoice}
                        isCityChoice={this.state.isCityChoice}
                    />
                </div>
                <div className="menu-uno">
                    <div className="grid-container-menu">
                        <fieldset className="fieldsetApp">
                            <legend style={{ color: "white" }}>Technical metrics</legend>

                            <input type="checkbox" id="create" name="create"
                                checked={this.state.isCheckedCreateChoice}
                                onClick={() => this.toggle(Create)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="create">Create date</label>
                            <br />

                            <input type="checkbox" id="update" name="update"
                                checked={this.state.isCheckedUpdateChoice}
                                onClick={() => this.toggle(Update)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="update">Update date</label>
                            <br />

                            <input type="checkbox" id="expiry" name="expiry"
                                checked={this.state.isCheckedExpiryChoice}
                                onClick={() => this.toggle(Expiry)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="expiry">Expiry date</label>
                            <br />

                        </fieldset>
                    </div>
                </div>
                <div className="menu-dos">
                    <div className="grid-container-menu">
                        <fieldset className="fieldsetApp">
                            <legend style={{ color: "white" }}>Technical metrics</legend>

                            <input type="checkbox" id="registered" name="registered"
                                checked={this.state.isCheckedRegisteredChoice}
                                onClick={() => this.toggle(Registered)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="registered">Registered?</label>
                            <br />

                            <input type="checkbox" id="servers" name="servers"
                                checked={this.state.isCheckedServersChoice}
                                onClick={() => this.toggle(Servers)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="servers">Servers name</label>
                            <br />

                            <input type="checkbox" id="domain" name="domain"
                                checked={this.state.isCheckedDomainChoice}
                                onClick={() => this.toggle(Domain)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="domain">Domain status</label>
                            <br />

                        </fieldset>
                    </div>
                </div>
                <div className="menu-tres">
                    <div className="grid-container-menu">
                        <fieldset className="fieldsetApp">
                            <legend style={{ color: "white" }}>Technical metrics</legend>

                            <input type="checkbox" id="registrar" name="registrar"
                                checked={this.state.isCheckedRegistrarChoice}
                                onClick={() => this.toggle(Registrar)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="registrar">Registrar name</label>
                            <br />

                            <input type="checkbox" id="company" name="company"
                                checked={this.state.isCheckedCompanyChoice}
                                onClick={() => this.toggle(Company)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="company">Company name</label>
                            <br />

                        </fieldset>
                    </div>
                </div>
                <div className="menu-cuatro">
                    <div className="grid-container-menu">
                        <fieldset className="fieldsetApp">
                            <legend style={{ color: "white" }}>Technical metrics</legend>

                            <input type="checkbox" id="country" name="country"
                                checked={this.state.isCheckedCountryChoice}
                                onClick={() => this.toggle(Country)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="country">Country name</label>
                            <br />

                            <input type="checkbox" id="city" name="city"
                                checked={this.state.isCheckedCityChoice}
                                onClick={() => this.toggle(City)}
                                onChange={() => { }}
                            />
                            <label style={{ color: 'antiquewhite', margin: '10px' }} htmlFor="city">City name</label>
                            <br />

                        </fieldset>
                    </div>
                </div>
                <div className="footer">
                    Cubex, 2019
                </div>
            </div>
        );
    }
}

export default App;