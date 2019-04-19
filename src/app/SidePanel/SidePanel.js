import React from 'react'
import SideNav, { /*Toggle, Nav,*/ NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import ClickOutside from '../../components/ClickOutside'
import "./SidePanel.css";
import '../App/App.css'
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import logo from '../../assets/Logo_Final-01.png'

import behance from '../../assets/behance.svg'
import dribbble from '../../assets/dribbble.svg'
import clutch from '../../assets/clutch.webp'
import designrush from '../../assets/designrush.jpg'
import linkedin from '../../assets/linkedin.png'
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook.png'

export default class SidePanel extends React.PureComponent {
  state = {
    expanded: false,
    toggle: false,
  };

  button = () => this.setState({
      toggle: !this.state.toggle
  });

  handleSidePanel = toggle => {
    if (!toggle) {
      this.panel.style.animation = "hidePanel .5s";
      setTimeout(() => {
        this.panel.style.display = "none";
      }, 300);
    }
    else {
      this.panel.style.display = "block";
      this.panel.style.animation = "showPanel .5s";
    };
  };

  componentDidUpdate = prevState => {
    if (prevState.toggle !== this.state.toggle) {
      this.handleSidePanel(this.state.toggle);
    };
  };

  navItem = (text, url, logo) => {
    return (
      <>
        <NavItem eventKey={text} onClick={() => window.open(url, '_blank')}>
          <NavIcon>
            <img src={logo} className='image' alt={text} />
          </NavIcon>
          <NavText>
            {text}
          </NavText>
        </NavItem>
      </>
    );
  }

  sideNav = () => {
    return (
      <div
        style={{ display: 'none', zIndex: 101 }}
        ref={node => { this.panel = node }}
      >
        <ClickOutside
          onClickOutside={() => this.setState({ expanded: false })}
        >
          <SideNav
            expanded={this.state.expanded}
            onToggle={expanded => this.setState({ expanded })}
          >
            <SideNav.Toggle />
            <SideNav.Nav /*defaultSelected="Our team"*/>
              {this.navItem('Our team', 'https://qbex.io/our-team', logo)}
              {this.navItem('Portfolio', 'https://qbex.io/portfolio', logo)}
              {this.navItem('Contact us', 'https://qbex.io/contact', logo)}
              <br />
              {this.navItem('behance', 'https://www.behance.net/office6784/', behance)}
              {this.navItem('dribbble', 'https://dribbble.com/CubeX', dribbble)}
              {this.navItem('clutch', 'https://clutch.co/profile/cubex-ukraine', clutch)}
              {this.navItem('designrush', 'https://www.designrush.com/agency/profile/cubex', designrush)}
              {this.navItem('linkedin', 'https://www.linkedin.com/company/cubex-ukraine/?viewAsMember=true', linkedin)}
              {this.navItem('instagram', 'https://www.instagram.com/cubex_team/', instagram)}
              {this.navItem('facebook', 'https://www.facebook.com/cubex.group/', facebook)}
            </SideNav.Nav>
          </SideNav>
        </ClickOutside>
      </div>
    )
  }

  render() {
    return (
      <>
        <img className="logo-header" src={logo} alt="logo" onClick={this.button} />
        <button
          onClick={this.button}
          className="btn btn-primary header-btn"
        >
          {!this.state.toggle ? `P` : 'H'}
        </button>
        {this.sideNav()}
      </>
    )
  }
}