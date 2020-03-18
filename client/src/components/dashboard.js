import React, { Component } from 'react';
import { connect } from "react-redux";
import { get_order_data } from "../store/FetchData";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};   
        get_order_data(this.props.username); 
    }   

    tableHeadDOM = () => {
        let table = [];
        let children = [];
        let data = {sNo:"S.NO",name:"Pass. Name", seat_no:"Seat No", items:"Item Name", item_count:"Count", total_amount:"Amount", status:"Status",action:"Action"}
            for (let key in data) {
                children.push(<th key={key} className={key}>{`${data[key]}`}</th>);
            }
            table.push(<tr className="tr">{children}</tr>);
          return table;
    }

    tableBodyDOM = () => {
        
        let datas =this.props.orderData;
        console.log(datas);
        let table = [];
        let count = 1; 
        for (let data of datas) {
            let children = [];
            children.push(<td key={count} className='s-no'>{count}</td>);
            for (let key in data) {
                children.push(<td key={key} className={key}>{`${data[key]}`} </td>);
            }
            children.push(<td key={'ab-'+count} className='s-no'><button type="button" id="btn-process" className="btn-sm btn-deep-purple waves-effect waves-light">Process</button></td>);
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
            <div className="table-container">
                <table className="table table-striped table-responsive2">
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
