import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Vendor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {vendor: {}}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/vendor/' + this.props.info)
             .then(response => {
                 this.setState({vendor: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             });
    }


    render() {
        return (
            <Link to = {`vendor/${this.state.vendor._id}`}> {this.state.vendor.name} ({this.state.vendor.totalRating})</Link>
        )
    }
}

