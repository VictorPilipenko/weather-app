import React, { Component } from "react";
import "./App.css";
import WeatherDisplay from '../DomainDisplay/DomainDisplay'
import logo from '../../assets/Logo_Final-01.png'

import SideNav, { /*Toggle, Nav,*/ NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import ClickOutside from '../../components/ClickOutside'

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class App extends Component {
  state = {

    value: `google.com\ntrello.com\ngithub.com`,
    // value: '',
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

  checkBox = (name, labelText) => {
    return (
      <>
        <input type="checkbox" id={name} name={name}
          checked={this.state[`isChecked${name}Choice`]}
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

    return (
      <div className="grid-container">
        <header className="header">
          {/* Ето хЕдЕр */}
          {/* <img className="logo" src={logo} alt="logo" /> */}
        </header>
        <div className='side-nav'>
          <ClickOutside
            onClickOutside={() => {
              this.setState({ expanded: false });
            }}
          >
            <SideNav
              expanded={this.state.expanded}
              onToggle={(expanded) => {
                this.setState({ expanded });
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="home">

                <NavItem eventKey="home">
                  <NavIcon>
                    <a target="_blank" rel="noopener noreferrer" href="https://qbex.io/our-team"><img src={logo} style={{ height: '25px', width: '50px' }} alt="Our team" /></a>
                  </NavIcon>
                  <NavText>
                    <a target="_blank" rel="noopener noreferrer" href="https://qbex.io/our-team">
                      Our team
                  </a>
                  </NavText>
                </NavItem>

                <NavItem eventKey="home">
                  <NavIcon>
                    <a target="_blank" rel="noopener noreferrer" href="https://qbex.io/portfolio"><img src={logo} style={{ height: '25px', width: '50px' }} alt="Portfolio" /></a>
                  </NavIcon>
                  <NavText>
                    <a target="_blank" rel="noopener noreferrer" href="https://qbex.io/portfolio">
                      Portfolio
                  </a>
                  </NavText>
                </NavItem>

                <NavItem eventKey="home">
                  <NavIcon>
                    <a target="_blank" rel="noopener noreferrer" href="https://qbex.io/contact"><img src={logo} style={{ height: '25px', width: '50px' }} alt="Contact" /></a>
                  </NavIcon>
                  <NavText>
                    <a target="_blank" rel="noopener noreferrer" href="https://qbex.io/contact">
                      Contact us
                  </a>
                  </NavText>
                </NavItem>

              </SideNav.Nav>
            </SideNav>
          </ClickOutside>
        </div>
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
            </fieldset>
          </div>
        </div>
        <div className="menu-cuatro">
          <div className="grid-container-menu">
            <fieldset className="fieldsetApp">
              <legend style={{ color: "white" }}>Technical metrics</legend>
              {this.checkBox(Country, 'Country name')}
              {this.checkBox(City, 'City name')}
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