import React from 'react'; //import axios from 'axios';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Airplain from './components/Airplain';
import Airport from './components/Airport';
import RetailAndBrand from './components/RetailAndBrand';
import Passenger from './components/Passenger';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';


import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, 
      redirect: true,
      validUser:true
    };
    
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }  
  
  render() {      
    
    var inValidUser = "";
    if(!this.state.validUser){
      inValidUser =<nav data-test="navbar" class="navbar-dark indigo navbar navbar-expand-md sticky-top" role="navigation">
                      <div data-test="navbar-brand" class="navbar-brand">
                        <strong class="white-text">
                          <i data-test="fa" class="fa fa-plane-departure"></i>
                          <span>Flyze</span>
                        </strong>
                      </div>
                    </nav>;
    }
    //console.log(props.users);
    return (
      <div className="App">
        <header >      
          {inValidUser}              
          <Router>
            <MDBNavbar color="indigo" dark expand="md" id="navbar" className={this.state.validUser ? 'sticky-top' : 'hide'}>
              <MDBNavbarBrand>
                <strong className="white-text">
                  <MDBIcon icon="plane-departure" />
                  <span>Flyze</span>
                </strong>
              </MDBNavbarBrand>
              <MDBNavbarBrand right className="user-name-wrapper">Hi <span className="user-name">Krishna</span></MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav left onClick={this.toggleCollapse}>
                  <MDBNavItem >
                    <MDBNavLink to="/home"><MDBIcon icon="home" /> <span>Home</span></MDBNavLink>
                  </MDBNavItem>            
                  <MDBNavItem>
                    <MDBNavLink to="/airport"><MDBIcon icon="archway" /> <span>Airport</span></MDBNavLink>
                  </MDBNavItem>    
                  <MDBNavItem>
                    <MDBNavLink to="/airplain"><MDBIcon icon="plane" /> <span>Airplain</span></MDBNavLink>
                  </MDBNavItem> 
                  <MDBNavItem>
                    <MDBNavLink to="/retailandbrand"><MDBIcon icon="shopping-cart" /> <span>Retail/Brand</span></MDBNavLink>
                  </MDBNavItem> 
                  <MDBNavItem>
                    <MDBNavLink to="/passenger"><MDBIcon icon="users" /> <span>Passenger</span></MDBNavLink>
                  </MDBNavItem>                
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret> <span className="lg-user-name">Hi Krishna</span>
                        <MDBIcon icon="user" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem href="#!">Action 1</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Action 2</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Action 3</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            <Switch> 
              <Route path='/login' component={Login} />
              <Route path='/home' component={Home} />
              <Route path='/airport' component={Airport} />
              <Route path='/airplain' component={Airplain} />
              <Route path='/retailandbrand' component={RetailAndBrand} />
              <Route path='/passenger' component={Passenger} />  
              <Route path='/navigation' component={Navigation} />  
              <Route path="*" component={NotFound}/>
            </Switch>
            <Redirect from= '/' to='/login'/>

            <div className={this.state.validUser ? 'mob-port-menu' : 'hide'}> 
              <div className="mp-menu-list">
                <MDBNavLink to="/airport"><MDBIcon icon="archway" /> <span>Airport</span></MDBNavLink>
              </div>    
              <div className="mp-menu-list">
                <MDBNavLink to="/airplain"><MDBIcon icon="plane" /> <span>Airplain</span></MDBNavLink>
              </div> 
              <div className="mp-menu-list">
                <MDBNavLink to="/retailandbrand"><MDBIcon icon="shopping-cart" /> <span>Retail</span></MDBNavLink>
              </div> 
              <div className="mp-menu-list">
                <MDBNavLink to="/passenger"><MDBIcon icon="users" /> <span>Passenger</span></MDBNavLink>
              </div>    
           </div>

          </Router>             
        </header>            
        
        
      </div>
    );
  }
}

export default App;
