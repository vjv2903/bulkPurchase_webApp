import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductInfo from './product-info.component'

export default class Vendor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {vendor: {}, products: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/vendor/' + this.props.match.params.vendorid)
             .then(response => {
                 this.setState({vendor: response.data});
                //  console.log(this.state.vendor);
             })
             .catch(function(error) {
                 console.log(error);
             });

        axios.get('http://localhost:4000/api/products?VendorId=' + this.props.match.params.vendorid)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             });
    }


    render() {
       return ( <div>
            <h1> Vendor : {this.state.vendor.name} </h1>
            <h2> Past Orders and Reviews </h2>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Customer Id</th>
                            <th>Review</th> 
                            <th>Rating</th>
                            <th/>
                            <th/>
                        </tr>
                    </thead>
                    {/* <tbody> */}
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                               <ProductInfo pr = {currentProduct} key = {currentProduct._id}/>
                            )
                        })
                    }
                    {/* </tbody> */}
                </table>
        </div>
       )}
}

