import React, {Component} from 'react';
import axios from 'axios';

export default class ProductsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: [], status: 'waiting'}
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        console.log(this.props.status);

        axios.get('http://localhost:4000/api/vendproducts?status=' + this.props.status, {headers: {'Authorization': token}} )
             .then(response => {
                console.log(response.data); 
                       this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    handleSubmit = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        let id = e.target.id;
        let datad = {}
        axios.put('http://localhost:4000/api/' + id + '/cancel', datad, {headers: {'Authorization': token}})
            .then(res => {
                console.log(res.data);
                window.location.reload();   
            })
            .catch(err => {
                alert(err.res);
            });
    }

    handleSubmitDispatch = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        let id = e.target.id;
        let datad = {}
        axios.put('http://localhost:4000/api/' + id + '/dispatch', datad, {headers: {'Authorization': token}})
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => {
                alert(err.res);
            });
        // window.location.reload();
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Qty Remaining</th>
                            <th>Product Price/Item</th> 
                            <th>Product Status</th>
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.qty}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.status}</td>
                                    
                                    {this.props.status === 'placed' ?
                                    (
                                     <td><button id = {currentProduct._id} onClick={this.handleSubmitDispatch}>Dispatch</button></td>
                                    ) : ''
                                    }
                                    
                                    {this.props.status === 'waiting'?
                                    (<td><button id = {currentProduct._id} onClick={this.handleSubmit}>Cancel</button></td>):''
                                    }

                                    {this.props.status === 'placed'?
                                    (<td><button id = {currentProduct._id} onClick={this.handleSubmit}>Cancel</button></td>):''
                                    }
                                    
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}