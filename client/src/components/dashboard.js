import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

  render() {
    return (
        <section className="dashboard">
            <div className="title-wrapper">
                <i data-test="fa" className="fa fa-home"></i>
                <span className="title-name">Dashboard</span>
            </div>
        </section>
    );
  }
}

export default Dashboard;