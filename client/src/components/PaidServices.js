
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PaidServices extends Component {
    constructor(props) {
        super(props);
        this.state = {modelOpen: false,fruits: [],paidOrderDOM:''};
    }
    toggleModelShow = () => {
      this.setState({modelOpen: true, paidOrderDOM: this.selectedItemDOM(this.state.fruits) });
      console.log(this.state.fruits);
    }
    toggleModelHide = () => {
      this.setState({ modelOpen: false });
    }

    selectedItemDOM = (datas) => {
      let table = [];            
      for (let data of datas) {
          let children = [];
          children.push(<div className="align-left"><p>{data['name']}</p><p>$ {data['price']}</p></div>);
          children.push( <div  className="align-right">
            <p><span className="order-count-wrapper">
              <span className="count-mins">-</span><span className="count-no">1</span><span className="count-plus">+</span>
            </span></p>
            <p>0.00</p>
          </div>);
          table.push(<div key={data['text']} className="selected-order-list" >{children}</div>);
      }
      return table;
    }    

paidServicesDOM () {
  let dataList = [
    {
      catagory: 'fruit juice',
      catagoryName: 'fruit',
      list:[
            {name: 'Grape Juice', price: '1'},
            {name: 'Pineapple Juice', price: '1'},
            {name: 'orange Juice', price: '2'},
            {name: 'Apple Juice', price: '2'},
            {name: 'Pomegranate Juice', price: '2'},
            {name: 'Mixed Juice', price: '2'}
          ]
    },
    {
      catagory: 'vegetables juice',
      catagoryName: 'vegetables',
      list: [
              {name: 'Carrot Juice', price: '1'},
              {name: 'Cucumber Juice', price: '1'},
              {name: 'Tomato Juice', price: '2'},
              {name: 'Kale Juice', price: '2'},
              {name: 'Mixed Juice', price: '2'}
            ]     
      }
    ];

  let table = [];           
  for (let datas of dataList) {
    //for (let data of datas) {
    let children = [];
    children.push(<div className="catagory">{datas['catagory']}</div>);
    children.push(<div className="free-service-wrapper airplane-paid-services">  
          <table className="table table2"><thead>
            <tr><th>Name</th><th>Price</th></tr></thead><tbody>{this.paidServices(datas['list'],datas['catagoryName'])}  </tbody>
          </table></div> );
    table.push(<div className="ap-s"> {children}</div>);
  }
  return table;
}

    paidServices (datas, typeOfService) {
      let table = [];  
      let count = 0;              
      for (let data of datas) {
          count++;
          let inputFieldId = data['id'] || typeOfService+'-'+count;
          let children = [];
          children.push(<td className="custom-control custom-checkbox"> 
          <input type="checkbox" className="custom-control-input" id={inputFieldId} price={data['price']} onClick={this.selectFruit} value={data['name']}/>
          <label className="custom-control-label" for={inputFieldId}>{data['name']}</label></td>);
          children.push( <td>$ {data['price']}</td>);
          table.push(<tr key={data['text']} className="paid-list" >{children}</tr>);
      }
      return table;
  }

  selectFruit= (e)=> {
  	if(e.target.checked) {
      this.setState({
        fruits: [ ...this.state.fruits, {
        'id': 's-'+e.target.id,
        'name': e.target.value,
        'price': e.target.getAttribute('price')
        }],
		});
    } else {
       let remove = this.state.fruits.map(function(item) { return item.value; }).indexOf(e.target.value);
		this.setState({
		  fruits: this.state.fruits.filter((_, i) => i !== remove)
       });
    }
    console.log(this.state.fruits);
  }
    
  render() {
    
    let hideShowClass = this.state.modelOpen ? 'modal fade show' : 'modal fade hide';  
 


    return (
      
        <section className="mobile-fz-features">
            <div className="serv-nav-link">
            <p><Link to="login" className="underline">PaidServices</Link></p>
            </div>

            <div>{this.paidServicesDOM()}</div>

            <div><button type="button" className="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#va-modal" onClick={this.toggleModelShow}>Process</button></div>
           

            <section className="paid-services">
            <div className={hideShowClass}  id="paid-services-modal" tabindex="-1" role="dialog" aria-modal="true" >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable " role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <p className="modal-title" id="exampleModalLabel">confirm <i data-test="fa" class="far fa-question-circle"></i></p>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModelHide}>
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <p className="bold">Order Summary </p>
                       <div>{this.state.paidOrderDOM}</div>
                      <div>                     </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary waves-effect waves-light" data-dismiss="modal" onClick={this.toggleModelHide}>Close</button>
                    <button type="button" className="btn btn-primary waves-effect waves-light va-submit"  onClick={this.paidOrder}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
         </section>


        </section>
    );
  }
}

export default PaidServices;