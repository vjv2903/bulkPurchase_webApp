import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            qty: 0,
            price: 0
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeQty(event) {
        this.setState({ qty: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            name: this.state.name,
            price: this.state.price,
            qty: this.state.qty
        }
        const token = this.props.token

        axios.post('http://localhost:4000/api/create_product', newProduct, {headers : { 'Authorization': token } })
             .then(res => console.log(res.data))
             .catch(err => console.log('Error'));

        this.setState({
            name: '',
            qty: 0,
            price: 0
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Qty: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.qty}
                               onChange={this.onChangeQty}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}