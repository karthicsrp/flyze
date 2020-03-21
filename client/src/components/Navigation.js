import React, { Component } from 'react';
import mapImg from '../Google-Maps.jpg';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
  render() {
    return (
        <section className="mobile-fz-features">
            <div className="serv-nav-link">
            <p><Link to="airport" className="underline">Airport</Link> -> Restroom</p>
            </div>
            <div className="Navigation">            
             <img src={mapImg} alt="map" />
            </div>
        </section>
    );
  }
}

export default Navigation;