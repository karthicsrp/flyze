import React, { Component } from 'react';

class RetailAndBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  retailAndBrandServices = () => {
      let table = []
      let datas = [
                      {icon: "fas fa-shopping-basket", text: "duty free shop"},
                      {icon: "fas fa-tshirt", text: "Clothing"},
                      {icon: "fas fa-magic", text: "Beauty"},
                      {icon: "fab fa-sketch", text: "Jewellery"}  
                           
                  ]
      for (let data of datas) {
          let children = [];
          children.push(<div><i data-test="fa" className={`${data['icon']}`}></i></div>);
          children.push(<div className="icon-text">{`${data['text']}`}</div>);
          table.push(<div className="service-icon">{children}</div>);
      }
      return table;
  }
  render() {
    return (
        <section className="mobile-fz-features">
          <div className="title-wrapper">
              <i data-test="fa" className="fa fa-shopping-cart"></i>
              <span className="title-name">Retail/Brand Services</span>
          </div>
          <div className="mobile-fz-features-wrapper">            
              {this.retailAndBrandServices()}
          </div>
        </section>
    );
  }
}

export default RetailAndBrand;