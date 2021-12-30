import React, { Component } from 'react';
import OrderItem from '../OrderItem'


class OrderList extends Component {
    constructor(props){
        super(props);
        this.state= {adata:[]};
    }
    componentDidMount(){
        fetch('/mock/orders.json').then(res=>{
            if(res.ok){
                res.json().then(adata=>{
                    this.setState({adata})
                })
            }
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.adata.map(item=>{
                        return <OrderItem key={item.id } adata={item}
                        onSubmit={this.handleSubmit}
                        />
                    })
                }
                
            </div>
        );
    }
    handleSubmit =(id,comment,stars ) => {
        fetch('saveComment').then(()=>{
            
        })
        const newData =this.state.adata.map(item =>{
            return item.id=== id ? 
            {
                ...item,comment, stars,ifCommented:true
            }:item;
        });
        this.setState({
            adata:newData
        })
    }
}

export default OrderList;