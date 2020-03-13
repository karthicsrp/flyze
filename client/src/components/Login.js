import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { get_user_data } from "../store/FetchData";
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {users:'',result: '',opneScanner:false, errorFlag: false};
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

    pnrVal = event => {
        this.setState({result : event.target.value, errorFlag: false});        
    }
    prnSubmit = () => {
        if(!this.state.result) {
            this.setState({ errorFlag: true });
        }
        get_user_data(this.state.result);
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
              children.push(<div>{`${data[key]}`}</div>)
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
            <section className="qr-scanner-wrapper"> 
                <div onClick={this.toggleQRScanner}>
                    <i data-test="fa" className="fa fa-qrcode qr-login"></i>
                </div>
                {qrDom}
                <div className="pnr-input-wrapper col-sm-12 col-md-6">
                    <div className="md-form"> 
                        <input type="text" name="pnr-no" id="pnr-no" className="form-control" value={this.state.result} onChange={this.pnrVal} />
                        <label className="active">PNR No</label>
                    </div>
                </div>
                <div className="pnr-submit-wrapper col-md-6 col-sm-6">
                    <div className="md-form">
                    <button type="button" className="btn btn-outline-primary waves-effect" onClick={this.prnSubmit}>Login</button>
                    </div> 
                </div>  
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