import React from 'react'; //import axios from 'axios';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBIcon, MDBCollapse } from "mdbreact";
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Airplane from './components/Airplane';
import Airport from './components/Airport';
import RetailAndBrand from './components/RetailAndBrand';
import Passenger from './components/Passenger';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Dashboard from './components/dashboard';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, 
      activeItem: 'home',
      redirect: true
    };
    
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }  

  handleItemClick(index) {
    this.setState({
      activeItem: index,
    })
  }
  
  mobileBottomFixedMenuListDOM = () => {
    if(this.props.userType === 'P') {
      let menuList = []
      let datas = [
                      {icon: "archway", text: "Airport", link: 'airport'},
                      {icon: "plane", text: "Airplane", link: 'airplane'},
                      {icon: "shopping-cart", text: "Retail", link: 'retailandbrand'},
                      {icon: "users", text: "Passenger", link: 'passenger'}   
                  ]; 
      for (let data of datas) {
          let children = [];
          children.push(<MDBNavLink to={`/${data['link']}`} ><MDBIcon icon={`${data['icon']}`}/><span>{`${data['text']}`}</span></MDBNavLink>);
          menuList.push(<div key={data['link']} className={this.state.activeItem === data['link'] ? 'mp-menu-list active' : 'mp-menu-list'} onClick={this.handleItemClick.bind(this, data['link'])} >{children}</div>); 
        }
      return menuList;    
    }
  }

  menuListDOM = () => {    
    let menuList = []
    let datas = [{icon: "far fa-list-alt", text: "Dashboard", link: 'dashboard'}];
    if(this.props.userType === 'P') {
      datas = [
                    {icon: "home", text: "Home", link: 'home'},
                    {icon: "archway", text: "Airport", link: 'airport'},
                    {icon: "plane", text: "Airplane", link: 'airplane'},
                    {icon: "shopping-cart", text: "Retail/Brand", link: 'retailandbrand'},
                    {icon: "users", text: "Passenger", link: 'passenger'}   
                ]; 
    }
    
    for (let data of datas) {
      let children = [];
      children.push(<MDBNavLink to={`/${data['link']}`} ><MDBIcon icon={`${data['icon']}`}/><span>{`${data['text']}`}</span></MDBNavLink>);
      menuList.push(<MDBNavItem key={data['link']} className={this.state.activeItem === data['link'] ? 'active' : ''} onClick={this.handleItemClick.bind(this, data['link'])} >{children}</MDBNavItem>);          
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
              <MDBNavbarBrand right className="user-name-wrapper"><span className="user-name">{this.props.username}</span><Link to="/login" className={hideShowClass} ><MDBIcon  icon="sign-out-alt mp-logout-icon" onClick={()=>this.props.removeData()}/></Link></MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} className={hideShowClass} />
              <MDBCollapse id="navbarCollapse3" className={hideShowClass} isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav left onClick={this.toggleCollapse}>
                  {this.menuListDOM()}         
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink to="#" className="lg-user-name">{this.props.username}</MDBNavLink >
                  </MDBNavItem>
                  <MDBNavItem>
                   <MDBNavLink to="/login" onClick={()=>this.props.removeData()}><MDBIcon icon="sign-out-alt" />LogOut</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            <Switch> 
              	<Route path='/login'>
            { (this.props.validUser) ?
                (this.props.userType === 'A') ?
                 <Redirect to="/dashboard" /> : 
                 <Redirect to="/home" /> : <Login />
            }
				    
				</Route> 
              <Route path='/home' component={Home} />
              <Route path='/airport' component={Airport} />
              <Route path='/airplane' component={Airplane} />
              <Route path='/retailandbrand' component={RetailAndBrand} />
              <Route path='/passenger' component={Passenger} />  
              <Route path='/navigation' component={Navigation} />  
              <Route path='/dashboard' component={Dashboard} />               
              <Route path="*" component={NotFound}/>
            </Switch>
            <Redirect from= '/' to='/login'/>

            <div className={this.props.validUser ? 'mob-port-menu' : 'hide'}> 
              {this.mobileBottomFixedMenuListDOM()}
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
    username: store.username,
    userType: store.userType
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
