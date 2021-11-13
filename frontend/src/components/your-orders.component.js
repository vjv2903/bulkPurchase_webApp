import React, {Component} from 'react';
import axios from 'axios';
import ShowOrder from './show-order.component.js';

export default class YourOrdersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        
        axios.get('http://localhost:4000/api/yourorders', {headers: {'Authorization': token}} )
             .then(response => {
                console.log(response.data); 
                this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Qty</th>
                            <th>Price</th>
                            <th>Product Status</th>
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <ShowOrder key = {i} condata = {currentProduct}/>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}