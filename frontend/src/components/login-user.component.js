import React, {Component} from 'react';
import axios from 'axios';

export default class LoginUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorr: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
  

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/api/auth/login', newUser)
             .then(res => {
                 console.log(res.data);
                 localStorage.setItem('token', res.data.token);
                 this.props.getTokenData();
                 this.setState({
                    email: '',
                    password: '',
                    errorr: ''
                 });

                 this.props.history.push('/');
             })
             .catch(err => {
                 console.log(err.response.data);
                 this.setState({
                     errorr: err.response.data
                 })
             });

        
    }

    render() {
        return (
            <div>   
                <h3>{this.state.errorr}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div> 
                    <div className="form-group">
                        <input type="submit" value="Login User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}