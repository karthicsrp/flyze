import React from 'react'; //import axios from 'axios';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBIcon, MDBCollapse } from "mdbreact";
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
import { connect } from "react-redux";


import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, 
      redirect: true
    };
    
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }  
  
  menuListDOM = () => {
    let menuList = []
    let datas = [
                    {icon: "home", text: "Home", link: 'home'},
                    {icon: "archway", text: "Airport", link: 'airport'},
                    {icon: "plane", text: "Airplain", link: 'airplain'},
                    {icon: "shopping-cart", text: "Retail/Brand", link: 'retailandbrand'},
                    {icon: "users", text: "Passenger", link: 'passenger'}   
                ]; 
    for (let data of datas) {
        let children = [];
        children.push(<MDBNavLink to={`/${data['link']}`} ><MDBIcon icon={`${data['icon']}`}/><span>{`${data['text']}`}</span></MDBNavLink>);
        menuList.push(<MDBNavItem>{children}</MDBNavItem>);          
    }
    return menuList;     
  }
  
  render() {      
	const hideShowClass =  this.props.validUser ? '' : 'hide';
    return (
      <div className="App">
        <header >      
                    
          <Router>
            <MDBNavbar color="indigo" dark expand="md" id="navbar" className='sticky-top'>
              <MDBNavbarBrand>
                <strong className="white-text">
                  <MDBIcon icon="plane-departure" />
                  <span>Flyze</span>
                </strong>
              </MDBNavbarBrand>
              <MDBNavbarBrand right className="user-name-wrapper">Hi <span className="user-name">{this.props.username}</span></MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} className={hideShowClass} />
              <MDBCollapse id="navbarCollapse3" className={hideShowClass} isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav left onClick={this.toggleCollapse}>
                  {this.menuListDOM()}         
                </MDBNavbarNav>
                <MDBNavbarNav right>
				<MDBNavItem>
					<span className="lg-user-name">{this.props.username}</span>
				</MDBNavItem>
                  <MDBNavItem>
                   <MDBNavLink to="/login" onClick={()=>this.props.removeData()}><MDBIcon icon="circle-notch" /></MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            <Switch> 
              	<Route path='/login'>
					  {this.props.validUser ? <Redirect to="/home" /> : <Login />}
				    
				</Route> 
              <Route path='/home' component={Home} />
              <Route path='/airport' component={Airport} />
              <Route path='/airplain' component={Airplain} />
              <Route path='/retailandbrand' component={RetailAndBrand} />
              <Route path='/passenger' component={Passenger} />  
              <Route path='/navigation' component={Navigation} />  
              <Route path="*" component={NotFound}/>
            </Switch>
            <Redirect from= '/' to='/login'/>

            <div className={this.props.validUser ? 'mob-port-menu' : 'hide'}> 
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

const mapStateToProps = (store) => {
	return {
		validUser: store.isValidUser,
		username: store.username
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		removeData: () => {
			dispatch({
				type: "REMOVE_USER"
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
