import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Airport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  airportServices = () => {
      let table = []
      let datas = [
                      {icon: "fa fa-archway", text: "Boarding"},
                      {icon: "fa fa-restroom", text: "restroom"},
                      {icon: "fa fa-wheelchair", text: "wheel charge"},
                      {icon: "fa fa-school", text: "Arrival/Departure gate"},
                      {icon: "fa fa-hand-holding-usd", text: "currency exchange"},
                      {icon: "fa fa-suitcase-rolling", text: "baggage"},
                      {icon: "fa fa-smoking", text: "smoking Area"},                      
                      {icon: "fa fa-shopping-cart", text: "temp sale counter"}           
                  ];
      for (let data of datas) {
          let children = [];
          children.push(<div><i data-test="fa" className={`${data['icon']}`}></i></div>);
          children.push(<div className="icon-text">{`${data['text']}`}</div>);
          table.push(<Link className="service-icon" to="/navigation" >{children}</Link>);          
      }
      return table;
  }
  render() {
    return (
        <section className="mobile-fz-features">
          <div className="title-wrapper">
              <i data-test="fa" className="fa fa-archway"></i>
              <span className="title-name">Airport Services</span>
          </div>
          <div className="mobile-fz-features-wrapper">            
              {this.airportServices()}
          </div>
        </section>
    );
  }
}

export default Airport;