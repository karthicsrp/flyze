import React, { Component } from 'react';

class Passenger extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
      passengerServices = () => {
          let table = []
          let datas = [
                          {icon: "fas fa-video", text: "Promotion/Video"},
                          {icon: "fas fa-music", text: "Music"},
                          {icon: "fas fa-photo-video", text: "Movies"},
                          {icon: "fas fa-trophy", text: "Quiz"}         
                      ]
          for (let data of datas) {
              let children = [];
              children.push(<div><i data-test="fa" className={`${data['icon']}`}></i></div>);
              children.push(<div className="icon-text">{`${data['text']}`}</div>);
              table.push(<div key={data['text']} className="service-icon" >{children}</div>);
          }
          return table;
      }
      render() {
        return (
            <section className="mobile-fz-features">
              <div className="title-wrapper">
                  <i data-test="fa" className="fa fa-users"></i>
                  <span className="title-name">Passenger Services</span>
              </div>
              <div className="mobile-fz-features-wrapper">            
                  {this.passengerServices()}
              </div>
            </section>
        );
      }
}

export default Passenger;