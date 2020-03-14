import React, { Component } from 'react';

class Airplane extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  airplaneServices () {
      let table = []
      let datas = [                                     
                      {icon: "fas fa-prescription-bottle", text: "water"},
                      {icon: "fa fa-mug-hot", text: "Tea"},
                      {icon: "fa fa-coffee", text: "Coffee"},
                      {icon: "fa fa-wine-glass-alt", text: "liquor"},
                      {icon: "fab fa-gulp", text: "fruit juice"},
                      {icon: "fa fa-pizza-slice", text: "Snacks"},
                      {icon: "fa fa-utensils", text: "food"},
                      {icon: "fa fa-briefcase-medical", text: "First aid/Medical"}                                
                  ];
                  //{icon: "fas fa-hands-helping", text: "Help Desk"} 
      for (let data of datas) {
          let children = [];
          children.push(<div><i data-test="fa" className={`${data['icon']}`}></i></div>);
          children.push(<div className="icon-text">{`${data['text']}`}</div>);
          table.push(<div key={data['text']} className="service-icon">{children}</div>);
      }
      return table;
  }
  render() {
    return (
        <section className="mobile-fz-features">
          <div className="title-wrapper">
              <i data-test="fa" className="fa fa-plane"></i>
              <span className="title-name">Airplane Services</span>
          </div>
          <div className="mobile-fz-features-wrapper">            
              {this.airplaneServices()}
          </div>
        </section>
    );
  }
}

export default Airplane;