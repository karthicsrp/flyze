import React, { Component } from 'react';
class FreeServices extends Component {
  constructor(props) {
    super(props);
    this.state = {vaOpen: false};
  }

  toggleModelShow = () => {
    this.setState({ vaOpen: true });
  }  

render() {
 
    return (
        <div></div>
    );
  }
}

export default FreeServices;