import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { get_user_data } from "../store/FetchData";
import { get_flight_data } from "../store/FetchData";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  users:'',result: '',opneScanner:false, 
                        errorFlag: false, hidAirHosteesLogin: true,
                        flight_id: '', flight_password: ''
                    };
    }

    componentDidMount() {
        this.userTocken();
    }
    
    toggleQRScanner = () => {
        this.setState({ opneScanner: !this.state.opneScanner });
    }

    userTocken = () => {
        var id = this.getQueryParam('token');
        if(id) {
            get_user_data(id);
        }
    }

    hidAirHostees(flag) {
        this.setState({hidAirHosteesLogin: flag});  
    }
    AirHosteesSubmit = () => {        
        if(!this.state.flight_id || !this.state.flight_password) {
            this.setState({ errorFlag: true });
            return false;
        }  
        get_flight_data(this.state.flight_id, this.state.flight_password);
        setTimeout(() => {
            if(this.props.userData.length === 0){
                this.setState({ errorFlag: true });               
            }
        }, 500);
    }
    flightIdChange = event => {
        this.setState({flight_id : event.target.value, errorFlag: false});        
    }
    passwordChange = event => {
        this.setState({flight_password : event.target.value, errorFlag: false});        
    }

    pnrVal = event => {
        this.setState({result : event.target.value, errorFlag: false});        
    }
    prnSubmit = () => {
        if(!this.state.result) {
            this.setState({ errorFlag: true });
            return false;
        }        
        get_user_data(this.state.result);
        setTimeout(() => {
            if(this.props.userData.length === 0){
                this.setState({ errorFlag: true });
            }
        }, 500);
    }
 
    getQueryParam = (name) => {
        var q = window.location.search.match(new RegExp('[?&]' + name + '=([^&#]*)'));
        return q && q[1];
    }
   
    handleScan = data => {
        if (data) {
          this.setState({
            result: data,
            opneScanner: false
          })
        }
    }

    handleError = err => {
        console.error(err)
    }

    createTable = () => {
        let labels = {pnr_id: 'PNR NO', name: 'Name', age: 'Age', dep_location: 'Dep location', dep_date_time: 'Dep Date & Time',ari_location: 'Ari location', ari_date_time: 'Ari Date & Time', terminal: 'terminal No', status: 'Status'};
        let table = []
        let userData = this.props.userData; 
        if(userData.length === 0) {
            return false;
        }
        for (let data of userData) {
          let children = []
          for (let key in data) {
            if(labels[key]) {
              children.push(<div className='label'>{`${labels[key]}`} :</div>)
              children.push(<div key={key} >{`${data[key]}`}</div>)
            }
          }
          table.push(<div className="pass-detail">{children}</div>)
        }
        return table
    }      

    render() {
        let qrDom = "";
        let errorDom ="";
        let passInfo = "";
        if (this.state.opneScanner) {      
            qrDom = <div>
                        <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '100%' }}
                        />                
                    </div>;
        }        
        if (this.props.userData.length > 0) { 
            passInfo = <section className="pass-info">
                            <div className="title-wrapper">
                                <i data-test="fa" className="fab fa-creative-commons-by"></i>
                                <span className="title-name">Passenger Info</span>
                            </div>
                            {this.createTable()}
                        </section> ;
        }         
        if (this.state.errorFlag) {  
            errorDom = <div className="error-msg">Invalid PNR</div>
        }
        
        return (     
            <section className="login-wrapper">    

                <section className={this.state.hidAirHosteesLogin ? 'qr-scanner-wrapper' : 'qr-scanner-wrapper hidden'}> 
                    <div className="passenger-login">
                        <div onClick={this.toggleQRScanner}>
                            <i data-test="fa" className="fa fa-qrcode qr-login"></i>
                        </div>
                        {qrDom}
                        <div className="pnr-input-wrapper">
                            <div className="md-form"> 
                                <input type="text" name="pnr-no" id="pnr-no" className="form-control" value={this.state.result} onChange={this.pnrVal} />
                                <label className="active">PNR NO</label>
                            </div>
                        </div>
                        <div className="pnr-submit-wrapper">
                            <div className="md-form">
                            <button type="button" className="btn btn-outline-primary waves-effect" onClick={this.prnSubmit}>Login</button>
                            </div> 
                        </div>  
                        <div className="col-md-12">
                        <p className="font-small d-flex justify-content-center">Are you a Air Hostess? <span href="#"
                            className="green-text ml-1 font-weight-bold" onClick={this.hidAirHostees.bind(this, false)}> Log in</span></p>
                        </div>
                    </div>
                </section>    

                <section className={this.state.hidAirHosteesLogin ? 'air-hostees-login hidden' : 'air-hostees-login'}> 
                    <div className="form-dark center">
                        <div className="card card-image">
                            <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                                <div className="text-center">
                                    <h3 className="white-text mb-5 mt-4 font-weight-bold">
                                        <strong>LOG</strong> 
                                        <span className="green-text font-weight-bold"><strong> IN</strong></span>
                                    </h3>
                                </div>
                                <div className="md-form">
                                    <input type="text" id="flight-id" className="form-control white-text" onChange={this.flightIdChange} />                        
                                    <label for="flight-id" className="active">Flight ID</label> 
                                        </div>
                                <div className="md-form">
                                    <input type="password" id="pass" className="form-control white-text" onChange={this.passwordChange} />
                                    <label for="pass" className="active">Password</label>                        
                                </div>
                                <div className="row d-flex align-items-center mb-4">
                                    <div className="text-center mb-3 col-md-12">
                                    <button type="button" className="btn btn-success btn-block btn-rounded z-depth-1" onClick={this.AirHosteesSubmit}>Log in</button>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <p className="font-small white-text d-flex justify-content-end">Are you a Passenger? <span href="#"
                                        className="green-text ml-1 font-weight-bold" onClick={this.hidAirHostees.bind(this, true)}> Log in</span></p>
                                </div>
                            </div>
                        </div>    
                    </div>            
                </section>                    
                

                {passInfo}
                {errorDom}
            </section> 

            
        );
    }
}

const mapStateToProps = (store) => {
	return {
		userData: store.userData
	}
}

export default connect(mapStateToProps)(Login);