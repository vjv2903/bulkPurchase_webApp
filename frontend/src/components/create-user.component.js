import React, {Component} from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router'

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            selectedOption: 'option1'
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }


    handleOptionChange(event) {
        this.setState({
            selectedOption: event.target.value
        });
    }
  
  

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            isVendor: (this.state.selectedOption === 'option1')
        }

        axios.post('http://localhost:4000/api/auth/register', newUser)
             .then(res => {
                 console.log(res.data);
                 localStorage.setItem('token', res.data.token);
                 this.props.getTokenData();
                 this.props.history.push('/');
             })
             .catch(err => {
                 alert(err.response.data);
             })

        this.setState({
            username: '',
            email: '',
            password: '',
            selectedOption: 'option1'
        });

    }

    render() {
        return (
            <div>   
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required/>  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               required/>  
                    </div>
                    <div className="radio">
                        <label> Vendor </label>
                        <input type="radio" value="option1" 
                                    checked={this.state.selectedOption === 'option1'} 
                                    onChange={this.handleOptionChange}/>
                    </div>
                    <div className="radio">
                        <label> Consumer </label>
                        <input type="radio" value="option2" 
                                    checked={this.state.selectedOption === 'option2'} 
                                    onChange={this.handleOptionChange} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}