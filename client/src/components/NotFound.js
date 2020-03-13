import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
  render() {
    return (
        <section className="mobile-fz-features">
            <div className="serv-nav-link">
            <p><Link to="login" className="underline">Login</Link></p>
            </div>
        </section>
    );
  }
}

export default NotFound;