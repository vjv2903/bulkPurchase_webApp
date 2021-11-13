import React, {Component} from 'react';
import axios from 'axios';

export default class NothingList extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
            <h1> Welcome to Bulkorder App </h1>
            <h1> Please login/register to continue</h1>
            </div>
        )
    }
}