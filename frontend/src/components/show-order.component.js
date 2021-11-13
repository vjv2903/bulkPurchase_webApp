import React, {Component} from 'react';
import axios from 'axios';

export default class ShowOrder extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: [{}], rate: 0, rated: false, reviewed: false, reviewrate: 0}
        this.onChangeRt = this.onChangeRt.bind(this);
        this.onChangeRRt = this.onChangeRRt.bind(this);
        this.onChangeRRRt = this.onChangeRRRt.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitR = this.onSubmitR.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        
        axios.get('http://localhost:4000/api/products?Id=' + this.props.condata.productId, {headers: {'Authorization': token}} )
             .then(response => {
                console.log(response.data); 
                       this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onChangeRt = (e) => {
        this.setState({
            rate: e.target.value
        })
    }

    onChangeRRt = (e) => {
        this.setState({
            reviewrate: e.target.value
        })
    }

    onChangeRRRt = (e) => {
        this.setState({
            reviewrateT: e.target.value
        })
    }

    onSubmitR(e){
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.put('http://localhost:4000/api/product/' + this.state.products[0]._id + '/rate', {rating: this.state.reviewrate, review: this.state.reviewrateT}, {headers: {'Authorization': token}})
        .then(res => {
            console.log(res.data);
            this.setState({
                reviewed: true
            })
        })
        .catch(err => console.log(err));
    }

    onSubmit(e){
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.put('http://localhost:4000/api/vendor/' + this.state.products[0].VendorId + '/rate', {rating: this.state.rate}, {headers: {'Authorization': token}})
        .then(res => {
            console.log(res.data);
            this.setState({
                rated: true
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <tr>
                <td> {this.state.products[0].name} </td>
                <td> {this.props.condata.qty} </td> 
                <td> {this.state.products[0].price * this.props.condata.qty}</td>
                <td> {this.state.products[0].status}</td>
                {this.state.products[0].status === 'placed' && !this.state.rated ? 
                (<td><input type="number" min="0" max="10" value={this.state.rate} onChange={this.onChangeRt}></input></td>): ''}
                {this.state.products[0].status === 'placed' && !this.state.rated ?
                (<td><input type="submit" value="Vendor Rate" className="btn btn-primary" onClick = {this.onSubmit} /></td>):''}
                {this.state.products[0].status === 'dispatched' && !this.state.reviewed ? 
                (<td><input type="number" min="0" max="10" value={this.state.reviewrate} onChange={this.onChangeRRt}></input></td>): ''}
                {this.state.products[0].status === 'dispatched' && !this.state.reviewed ? 
                (<td><input type="text" value={this.state.reviewrateT} onChange={this.onChangeRRRt}></input></td>): ''}
                {this.state.products[0].status === 'dispatched' && !this.state.reviewed ?
                (<td><input type="submit" value="Product Rate" className="btn btn-primary" onClick = {this.onSubmitR} /></td>):''}
            </tr>
        )
    }
}