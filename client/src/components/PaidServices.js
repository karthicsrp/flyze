
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class PaidServices extends Component {
    constructor(props) {
        super(props);
        this.state = {modelOpen: false,fruits: [],paidOrderDOM:''};
    }
    toggleModelShow = () => {
      this.setState({modelOpen: true, paidOrderDOM: this.selectedItemDOM(this.state.fruits) });
    }
    toggleModelHide = () => {
      this.setState({ modelOpen: false });
    }

    paidOrderSubmit =() => {
      let elements = document.getElementsByClassName('selected-order-list');
      let dataList = [];
      let orderData = {pId: this.props.userData[0].id, name: this.props.userData[0].name, type: 'paid', seatNo: this.props.userData[0].seat_no, flightId: this.props.userData[0].flight_id, items:'', count: 0, totalAmount:0};
      for (var i = 0; i < elements.length; i++) {
        var items = elements[i].querySelector('.selected-order-name').textContent;
        var count = elements[i].querySelector('.count-no').textContent;
        var price = elements[i].querySelector('.selected-order-price').textContent;
        var sum = elements[i].querySelector('.selected-order-sum').textContent;
        dataList.push({items: items, count: count, price: price, sum: sum});
        orderData.items += (i !== elements.length-1) ? items+', ' : items; 
        orderData.count += Number(count);
      }      
      orderData.totalAmount = Number(document.getElementById('net-amount').textContent)          
      var orderCount = elements.length;
      fetch(`http://localhost:4000/server/paidOrder?datas=${JSON.stringify(orderData)}`).then(response => response.json())
      .then(data => {
       if(orderCount > 1 && data.insertId) {
          fetch(`http://localhost:4000/server/paidOrderDetails?dataList=${JSON.stringify(dataList)}&orderId=${data.insertId}`).then(response => response.json())
          .then(resData => {
            console.log(resData);
          });
        }           
      });
      
      this.setState({ paidOrderDOM: 'Succss', fruits:[], modelOpen: false });  
      document.getElementById('net-amount').innerHTML = 0;
      this.uncheckElements();

    }
    uncheckElements = () => {
      var uncheck=document.getElementsByTagName('input');
      for(var i=0;i<uncheck.length;i++) {
        if(uncheck[i].type ==='checkbox') {
          uncheck[i].checked=false;
        }
      }
    }

    countChange = (e) => {
      
      let rowId = e.target.getAttribute('row-id');
      let perQntRateEle = document.getElementById('selected-order-price-'+rowId);
      let sumEle = document.getElementById('selected-order-sum-'+rowId);
      
      if(e.target.className === 'count-plus'){
        let currCount = Number(e.target.previousSibling.textContent) + 1;
        e.target.previousSibling.textContent = currCount;
        let perQntRate = perQntRateEle.textContent;
        let sum = Number(perQntRate) * currCount;
        sumEle.textContent = sum;
        if(Number(e.target.previousSibling.textContent) > 0){
          e.target.previousSibling.previousSibling.classList.remove("disabled");
        }
      }
      else {      
       if(e.target.classList.contains('disabled')) return false;

        if(Number(e.target.nextSibling.textContent) > 0){
          let currCount = Number(e.target.nextSibling.textContent) -1;
          e.target.nextSibling.textContent = currCount;      
          let perQntRate = perQntRateEle.textContent;
          let sum = Number(perQntRate) * currCount;
          sumEle.textContent = sum;  
        } else {
          e.target.classList.add("disabled");
        }
      }
      
      let priceList = document.getElementsByClassName('selected-order-sum');
      let netAmount = 0;
      for (var i = 0; i < priceList.length; i++) {
        netAmount += Number(priceList[i].textContent);        
      }
      document.getElementById('net-amount').textContent = netAmount;

    }

    selectedItemDOM = (datas) => {
      let table = [];
      let count = 0;     
      let netAmount = 0;       
      for (let data of datas) {
          count ++;
          let children = [];
          children.push(<div className="align-left"><p className="selected-order-name" >{data['name']}</p><p>$ <span className="selected-order-price" id={'selected-order-price-'+count}>{data['price']}</span></p></div>);
          children.push( <div  className="align-right">
            <p><span className="order-count-wrapper">
              <span className="count-mins" row-id={count} onClick={this.countChange}>-</span><span className="count-no">1</span><span className="count-plus" row-id={count}  onClick={this.countChange}>+</span>
            </span></p>
            <p className="selected-order-sum" id={'selected-order-sum-'+count}>{data['price']}</p>
          </div>);
          table.push(<div key={data['text']} className="selected-order-list" >{children}</div>);
          netAmount += Number(data['price']);
      }
      document.getElementById('net-amount').textContent = netAmount;

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
  }
    
  render() {
    
    let hideShowClass = this.state.modelOpen ? 'modal fade show' : 'modal fade hide';  
 


    return (
      
        <section className="mobile-fz-features">
            <div className="serv-nav-link">
            <p><Link to="airplane" className="underline">Airplane</Link> -> Paid Services</p>
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
                      <p className="bold title">Order Summary </p>
                       <div id="empty-on-sucess-cancel">{this.state.paidOrderDOM}</div>
                      <div className="selected-order-sum-wrapper bold"> 
                       <div className="align-left">Total Amount</div> 
                       <div className="align-right" id="net-amount"></div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary waves-effect waves-light" data-dismiss="modal" onClick={this.toggleModelHide}>Close</button>
                    <button type="button" className="btn btn-primary waves-effect waves-light va-submit"  onClick={this.paidOrderSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
         </section>


        </section>
    );
  }
}


const mapStateToProps = (store) => {
	return {
		validUser: store.isValidUser,
    username: store.username,
    userData: store.userData
	}
}

export default connect(mapStateToProps)(PaidServices);