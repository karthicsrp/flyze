import React, { Component } from 'react';
import { connect } from "react-redux";

class Airplane extends Component {
  constructor(props) {
    super(props);
    this.state = {vaOpen: false, servType: '', servName: ''};
  }
  toggleModelShow(servName){
    this.setState({ vaOpen: true, servName:servName, servType: 'free' });
  } 
  vaOrder = () => {
    this.setState({ vaOpen: false });
    fetch(`http://localhost:4000/server/order?type=${this.state.servType}&items=${this.state.servName}&pId=${this.props.userData[0].id}&name=${this.props.userData[0].name}&seatNo=${this.props.userData[0].seat_no}&flightId=${this.props.userData[0].flight_id}`).then(response => response.json())
    .then(data => {console.log(data);}  );

  }
  toggleModelHide = () => {
    this.setState({ vaOpen: false });
  }
  airplaneServices () {
      let table = []
      let datas = [                                     
                      {icon: "fas fa-prescription-bottle", text: "Water"},
                      {icon: "fa fa-mug-hot", text: "Tea"},
                      {icon: "fa fa-coffee", text: "Coffee"},
                      {icon: "fa fa-wine-glass-alt", text: "Liquor"},
                      {icon: "fab fa-gulp", text: "fruit Juice"},
                      {icon: "fa fa-pizza-slice", text: "Snacks"},
                      {icon: "fa fa-utensils", text: "Food"},
                      {icon: "fa fa-briefcase-medical", text: "First aid/Medical"}                                
                  ];
                  //{icon: "fas fa-hands-helping", text: "Help Desk"} 
      for (let data of datas) {
          let children = [];
          children.push(<div><i data-test="fa" className={`${data['icon']}`}></i></div>);
          children.push(<div className="icon-text">{`${data['text']}`}</div>);
          table.push(<div key={data['text']} className="service-icon" data-toggle="modal" data-target="#va-modal" onClick={this.toggleModelShow.bind(this, data['text'])}>{children}</div>);
      }
      return table;
  }
  render() {
    let hideShowClass = this.state.vaOpen ? 'modal fade show' : 'modal fade hide';
    return (
        <section className="mobile-fz-features">
          <div className="title-wrapper">
              <i data-test="fa" className="fa fa-plane"></i>
              <span className="title-name">Airplane Services</span>
          </div>
          <div className="mobile-fz-features-wrapper">            
              {this.airplaneServices()}
          </div>
         

          <section className="free-fervices">
          <div className="title-wrapper">
              <i data-test="fa" className="fa fa-archway"></i>
              <span className="title-name">Airport Services</span>
          </div>
          <div className="">            
           
            <div className={hideShowClass}  id="va-modal" tabindex="-1" role="dialog" aria-modal="true" >
              <div className="modal-dialog" role="document">
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
                      <div>
                       <button type="button" className="btn btn-primary waves-effect waves-light va-submit"  onClick={this.vaOrder}>Submit</button>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary waves-effect waves-light" data-dismiss="modal" onClick={this.toggleModelHide}>Close</button>
                     </div>
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
const mapDispatchToProps = (dispatch) => {
	return {
		removeData: () => {
			dispatch({
				type: "REMOVE_USER"
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Airplane);