import React from 'react'
import SideNav, { /*Toggle, Nav,*/ NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import ClickOutside from '../../components/ClickOutside'
import logo from '../../assets/Logo_Final-01.png'
import "./SidePanel.css";
import '../App/App.css'

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


export default class SidePanel extends React.Component {

  state = {
    expanded: false,
    toggle: false,
  }

  button = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  ret = () => {
    // console.log(this.state.toggle)
    return (
      this.state.toggle ?
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
        : null
    )
  }

  render() {
    return (
      <>
       <img className="logo-header" src={logo} alt="logo" onClick={this.button} />
        <button
          onClick={this.button}
          className="btn btn-primary headr-btn"
        >
        {!this.state.toggle ? `show menu` : 'hide menu'} 
        </button>
        {this.ret()}
      </>
    )
  }
}