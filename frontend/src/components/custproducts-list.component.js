import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './table-row.component.js';

export default class CustomerList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: [], searchTerm: '', sortby: 'default'}
        this.handleChange = this.handleChange.bind(this);
        this.handlesChange = this.handlesChange.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/products?status=waiting')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    handleChange = e => {
        this.setState({
            searchTerm: e.target.value
        })
        
    }

    handlesChange = e => {
        this.setState({
            sortby: e.target.value
        })
        this.getData();
    }

    getData = () => {
        axios.get('http://localhost:4000/api/products?status=waiting&name=' + this.state.searchTerm)
             .then(response => {
                if(this.state.sortby === 'qtyleft') {
                    response.data.sort((a, b) => a.qty - b.qty);
                } 
                if(this.state.sortby === 'price') {
                    response.data.sort((a, b) => a.price - b.price);
                }
                this.setState({products: response.data});
                console.log(this.state.products);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.searchTerm} onChange={this.handleChange}/>
                <input type="submit" value="search" onClick={this.getData}/>
                <label>Sort By:</label>
                <select value={this.state.sortby} onChange={this.handlesChange}>
                    <option value="default">Default</option>
                    <option value="qtyleft">Qty Left</option>
                    <option value="price">Price</option>
                </select>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Qty Left</th>
                            <th>Product Price</th>
                            <th>Vendor (Rating)</th>
                            <th>Qty Reqd </th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <TableRow pr = {currentProduct} key = {currentProduct._id}/>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}