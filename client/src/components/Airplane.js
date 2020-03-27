import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Airplane extends Component {
  constructor(props) {
    super(props);
    this.state = {vaOpen: false, servType: '', servName: ''};
  }
  toggleModelShow(servName, typeOfService){
    this.setState({ vaOpen: true, servName:servName, servType: typeOfService });
  } 
  vaOrder = () => {
    this.setState({ vaOpen: false });
    fetch(`http://localhost:4000/server/order?type=${this.state.servType}&items=${this.state.servName}&pId=${this.props.userData[0].id}&name=${this.props.userData[0].name}&seatNo=${this.props.userData[0].seat_no}&flightId=${this.props.userData[0].flight_id}`).then(response => response.json())
    .then(data => {console.log(data);}  );

  }
  toggleModelHide = () => {
    this.setState({ vaOpen: false });
  }
  airpoartServices (datas, typeOfService) {
      let table = [];                 //{icon: "fas fa-hands-helping", text: "Help Desk"} 
      for (let data of datas) {
          let children = [];
          children.push(<div><i data-test="fa" className={`${data['icon']}`}></i></div>);
          children.push(<div className="icon-text">{`${data['text']}`}</div>);
          if(typeOfService === 'free') {
            table.push(<div key={data['text']} className="service-icon" data-toggle="modal" data-target="#va-modal" onClick={this.toggleModelShow.bind(this, data['text'], typeOfService)}>{children}</div>);
    
          } else{
              table.push(<Link class="service-icon" key={data['text']} to="paidservices">{children}</Link>);    
          }
      }
      return table;
  }
  render() {
    let free = [                                  
              {icon: "fas fa-prescription-bottle", text: "Water"},
              {icon: "fa fa-mug-hot", text: "Tea"},
              {icon: "fa fa-coffee", text: "Coffee"},
              {icon: "fa fa-wine-glass-alt", text: "Liquor"}
            ];
    let pay = [                           
            {icon: "fab fa-gulp", text: "fruit Juice"},
            {icon: "fa fa-pizza-slice", text: "Snacks"},
            {icon: "fa fa-utensils", text: "Food"},
            {icon: "fa fa-briefcase-medical", text: "First aid/Medical"}  
          ]; 
          let brand = [                           
            {icon: "fas fa-bus", text: "travel package"},
            {icon: "fas fa-tshirt", text: "clothing"} 
          ]; 

    let hideShowClass = this.state.vaOpen ? 'modal fade show' : 'modal fade hide';  
     

    return (
        <section className="mobile-fz-features">
          <div className="title-wrapper">
              <i data-test="fa" className="fa fa-plane"></i>
              <span className="title-name">Airplane Services</span>
          </div>
          <div className="ap-s">            
              <div className="catagory">Free Service</div>
              <div className="free-service-wrapper airplane-services">               
                {this.airpoartServices(free, 'free')}
              </div>
              <div className="catagory">Paid Service</div>
              <div className="paid-service-wrapper airplane-services">               
                {this.airpoartServices(pay, 'paid')}
              </div>

              <div className="catagory">brand Service</div>
              <div className="brand-service-wrapper airplane-services">               
                {this.airpoartServices(brand, 'brand')}
              </div>
          </div>         

          <section className="free-fervices">
            <div className={hideShowClass}  id="va-modal" tabindex="-1" role="dialog" aria-modal="true" >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable " role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <p className="modal-title" id="exampleModalLabel">confirm <i data-test="fa" class="far fa-question-circle"></i></p>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModelHide}>
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <h3>Request for {this.state.servName}</h3>                      
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary waves-effect waves-light" data-dismiss="modal" onClick={this.toggleModelHide}>Close</button>
                    <button type="button" className="btn btn-primary waves-effect waves-light va-submit"  onClick={this.vaOrder}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
         </section>

        </section>
    );
  }
}

const mapStateToProps = (store) => {
	return {
		validUser: store.isValidUser,
    username: store.username,
    userData: store.userData
	}
}

export default connect(mapStateToProps)(Airplane);