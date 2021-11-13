import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Vendor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {consumers: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/orders?product=' + this.props.pr._id)
             .then(response => {
                 this.setState({consumers: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             });
    }


    render() {
      return (  
      
        <tbody>
          {
            this.state.consumers.map((currentProduct, i) => {
            return (
               <tr>
                   <td> {this.props.pr.name} </td>
                   <td> {currentProduct.userId} </td>
                   <td> {currentProduct.review} </td>
                   <td> {currentProduct.rating} </td>
               </tr>
            )
            })
          }
        </tbody>
    )
    }
}

