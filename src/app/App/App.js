import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from '../DomainDisplay/DomainDisplay'
import logo from '../../assets/Logo_Final-01.png'
import SidePanel from '../SidePanel/SidePanel'

class App extends Component {
  state = {

    // value: `google.com`,
    value: '',
    arrayOfDomainNames: [],

    isCreateChoice: true,
    isUpdateChoice: true,
    isExpiryChoice: true,
    isRegisteredChoice: true,
    isServersChoice: true,
    isDomainChoice: true,
    isRegistrarChoice: true,
    isCompanyChoice: true,
    isCountryChoice: true,
    isCityChoice: true,
    isIssuerChoice: true,
    isDaysChoice: true,
    isFromChoice: true,
    isToChoice: true,
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

  toggle = name => this.setState({
    [`is${name}Choice`]: !this.state[`is${name}Choice`]
  });

  checkBox = (name, labelText) => {
    return (
      <>
        <input type="checkbox" id={name} name={name}
          checked={this.state[`is${name}Choice`]}
          onClick={() => this.toggle(name)}
          onChange={() => { }}
        />
        <label style={{ color: 'white', margin: '10px' }} htmlFor={name}>{labelText}</label>
        <br />
      </>
    );
  }

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
    const Issuer = 'Issuer';
    const Days = 'Days';
    const From = 'From';
    const To = 'To';


    return (
      <div className="grid-container">
        <header className="header">
          <SidePanel />
        </header>
        <div className="input-bar">
          <div className="input-bar-items">
            {/* три пробела перед и после*/}
            <span className="legendForTextarea">{'\u00A0'}{'\u00A0'}{'\u00A0'}Add domains{'\u00A0'}{'\u00A0'}{'\u00A0'}</span>
            <textarea
              value={this.state.value}
              placeholder="..one per line"
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
        <div className="menu-uno">
          <div className="grid-container-menu">
            <fieldset className="fieldsetApp">
              <legend style={{ color: "white" }}>Technical metrics</legend>
              {this.checkBox(Create, 'Create date')}
              {this.checkBox(Update, 'Update date')}
              {this.checkBox(Expiry, 'Expiry date')}
            </fieldset>
          </div>
        </div>
        <div className="menu-dos">
          <div className="grid-container-menu">
            <fieldset className="fieldsetApp">
              <legend style={{ color: "white" }}>Technical metrics</legend>
              {this.checkBox(Registered, 'Registered?')}
              {this.checkBox(Servers, 'Servers name')}
              {this.checkBox(Domain, 'Domain status')}
            </fieldset>
          </div>
        </div>
        <div className="menu-tres">
          <div className="grid-container-menu">
            <fieldset className="fieldsetApp">
              <legend style={{ color: "white" }}>Technical metrics</legend>
              {this.checkBox(Registrar, 'Registrar name')}
              {this.checkBox(Company, 'Company name')}
              {this.checkBox(Country, 'Country name')}
              {this.checkBox(City, 'City name')}
            </fieldset>
          </div>
        </div>
        <div className="menu-cuatro">
          <div className="grid-container-menu">
            <fieldset className="fieldsetApp">
              <legend style={{ color: "white" }}>SSL metrics</legend>
              {this.checkBox(Issuer, 'Issuer')}
              {this.checkBox(Days, 'Days left')}
              {this.checkBox(From, 'Valid from')}
              {this.checkBox(To, 'Valid to')}
            </fieldset>
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
            isIssuerChoice={this.state.isIssuerChoice}
            isDaysChoice={this.state.isDaysChoice}
            isFromChoice={this.state.isFromChoice}
            isToChoice={this.state.isToChoice}
          />
        </div>
        <footer className="footer">
          <img className="logo-footer" src={logo} alt="logo" />
          © Cubex, 2019
        </footer>
      </div>
    );
  }
}

export default App;