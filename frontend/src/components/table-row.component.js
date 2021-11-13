import React, {Component} from 'react';
import axios from 'axios';
import Vendor from './vendor-name.component.js';

export default class TableRow extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            prqty: this.props.pr.qty,
            qty: 1
        }

        this.onChangeQty = this.onChangeQty.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeQty(event) {
        this.setState({ qty: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        
        const newUser = {
            qty: this.state.qty
        }

        axios.post('http://localhost:4000/api/' + this.props.pr._id + '/order', newUser, {headers : { 'Authorization': token } })
            .then(res => console.log(res.data))
            .catch(err => console.log('Error'));

        
        let newqty = this.state.prqty - this.state.qty;
        this.setState({
            qty: 1,
            prqty: newqty
        });

        // window.location.reload(false);
    }

    render() {
        
        return (
            <tr>
                {/* <form onSubmit = {this.onSubmit}> */}
                    <td>{this.props.pr.name}</td>
                    <td>{this.state.prqty}</td>
                    <td>{this.props.pr.price}</td>
                    <td><Vendor info = {this.props.pr.VendorId}/></td>
                    <td><input type="number" min="1" max={this.props.pr.qty} value={this.state.qty} onChange={this.onChangeQty}></input></td>
                    <td><input type="submit" value="Order" className="btn btn-primary" onClick = {this.onSubmit} /></td>
                {/* </form> */}
            </tr>
        )
    }
}