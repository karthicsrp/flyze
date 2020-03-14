import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    services = () => {
        let table = []
        let datas = [
                        {icon: "fa fa-archway", text: "Airport", link: "airport"},
                        {icon: "fa fa-plane-departure", text: "Airplane", link: "airplane"},
                        {icon: "fa fa-shopping-cart", text: "Retail/Brand", link: "RetailAndBrand"},
                        {icon: "fa fa-users", text: "Passenger", link: "passenger"}       
                    ]
        for (let data of datas) {
             let children = [];
            children.push(<div><i data-test="fa" className={`${data['icon']}`}></i></div>);
            children.push(<div className="icon-text">{`${data['text']}`}</div>);
             table.push(<Link key={data['text']} to={`${data['link']}`} className="service-icon">{children}</Link>);
        }
        return table
    }

  render() {
    return (
        <section className="mobile-fz-features">
            <div className="title-wrapper">
                <i data-test="fa" className="fa fa-home"></i>
                <span className="title-name">Features</span>
            </div>
            <div className="mobile-fz-features-wrapper">            
                {this.services()}
            </div>
        </section>
    );
  }
}

export default Home;