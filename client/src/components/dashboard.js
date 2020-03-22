import React, { Component } from 'react';
import { connect } from "react-redux";
import { get_order_data } from "../store/FetchData";

import io from 'socket.io-client';
const socket = io('http://localhost:4000');

socket.on('getOrderDatas', orderDatas => console.log(orderDatas));
socket.on('connect', function(){console.log('client connect');});
        socket.on('timer', timestamp => console.log('client timer resp',timestamp));
        socket.emit('mycustomevent','client...');

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};   
        get_order_data(this.props.username); 
    }   

    tableHeadDOM = () => {
        let table = [];
        let children = [];
        let data = {sNo:"S.NO",name:"Pass. Name", seat_no:"Seat No", items:"Item Name", item_count:"Count", type_of_serv:"Service Type", total_amount:"Amount", status:"Status",action:"Action"}
            for (let key in data) {
                children.push(<th key={key} className={key}>{`${data[key]}`}</th>);
            }
            table.push(<tr className="tr">{children}</tr>);
          return table;
    }

    orderAction(id, actionType){
        fetch(`http://localhost:4000/server/orderAction?id=${id}&actionType=${actionType}`)
		.then(response => response.json())
		.then(response => { 
            if(response) {
                get_order_data(this.props.username); 
            }				
		})
		.catch(err => console.log(err))
    } 

    tableBodyDOM = () => {
        
        let datas =this.props.orderData;
        //console.log(datas);
        let table = [];
        let count = 1; 
        for (let data of datas) {
            let children = [];
            children.push(<td key={count} className='s-no'>{count}</td>);
            for (let key in data) {
                if(key === 'id') continue;
                children.push(<td key={key} className={key}>{`${data[key]}`} </td>);
            }
           let processBtn = <button type="button" onClick={this.orderAction.bind(this, data['id'], 'in progress')} className="btn-sm btn-process">Process</button>;
           let cancelBtn = <button type="button" onClick={this.orderAction.bind(this, data['id'], 'canceled')} className="btn-sm btn-cancel">Cancel</button>;
           let deleveredBtn = <button type="button" onClick={this.orderAction.bind(this, data['id'], 'delivered')} className="btn-sm btn-deliver">Delivered</button>;
           let btn = (data['status'] === 'in progress') ? deleveredBtn : processBtn ;
        children.push(<td key={'ab-'+count} className='s-no'>{btn}{cancelBtn}</td>);
            table.push(<tr className="tr">{children}</tr>);
            count++;
          }
          return table;
    }

  render() {
    return (
        <section className="dashboard">
            <div className="title-wrapper">
                <i data-test="fa" className="fa fa-home"></i>
                <span className="title-name">Dashboard</span>
            </div>
            <div className="table-container table-responsive">
                <table className="table table-striped">
                    <thead className="black white-text">
                        {this.tableHeadDOM()}
                    </thead>
                    <tbody>
                        {this.tableBodyDOM()}
                    </tbody>
                </table>        
            </div>
        </section>
    );
  }
}

const mapStateToProps = (store) => {
	return {
        username: store.username,
        orderData: store.orderData
	}
}

export default connect(mapStateToProps)(Dashboard);
