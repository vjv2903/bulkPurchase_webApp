import React, {Component, useReducer} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import NothingList from './components/nothing-list.component'
import ProductsList from './components/products-list.component'
import CustomerList from './components/custproducts-list.component'
import CreateUser from './components/create-user.component'
import CreateProduct from './components/create-product.component'
import LoginUser from './components/login-user.component'
import YourOrdersList from './components/your-orders.component'
import VendorProfile from './components/vendor-info.component'
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'token': '',
      'isAuthenticated': false,
      'isVendor': false,
      'name': ''
    }
  }

  getTokenData = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    console.log('REQUESTING CREDENTIALS');
    axios.get('http://localhost:4000/api/auth/me', { params:{}, headers: { 'Authorization': token }})
    .then(response => {
      console.log(response.data);
      if(response.status === 200) {
        this.setState({
          'token': token,
          'isAuthenticated': true,
          'isVendor': response.data.isVendor,
          'name': response.data.name
        });
      }
    })
    .catch(error => {
      console.log('Error ' + error);
    });
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({
      'token': '',
      'isAuthenticated': false,
      'isVendor': false,
      'name': ''
    })
    window.location.href = 'http://localhost:3000/';
  }

  componentDidMount(){
    this.getTokenData();
  }
  
  render(){
    return(
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">BulkOrder</Link>
            <div className="collapse navbar-collapse">
                {!this.state.isAuthenticated ?
                (<ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Register</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </ul>):
                this.state.isVendor ? (
                  <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/createproduct" className="nav-link">Create Product</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/dispatchready" className="nav-link">Ready to Dispatch</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/dispatched" className="nav-link">Dispatched</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/cancelled" className="nav-link">Cancelled</Link>
                  </li>
                </ul>
                ) : (
                  <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/yourorders" className="nav-link">Your Orders</Link>
                  </li>
                  </ul>
                )
                }
            </div>
          </nav>  

          <br/>
          {!this.state.isAuthenticated ? 
            (
            <Route path="/" exact component={NothingList}/>
            ) : this.state.isVendor ?
            (
              <Route exact path="/"
              render={(props) => <ProductsList {...props} status='waiting'/>}
              />
            ) :
            (
            <Route path="/" exact component={CustomerList}/>
            )
          }
          <Route path="/create"
                render={(props) => <CreateUser {...props} getTokenData={this.getTokenData}/>}
          />
          <Route path="/login"
                render={(props) => <LoginUser {...props} getTokenData={this.getTokenData}/>}
          />
          <Route path="/createproduct"
                render={(props) => <CreateProduct {...props} token={this.state.token}/>}
          />
          <Route path="/dispatchready"
                render={(props) => <ProductsList {...props} status='placed'/>}
          />
          <Route path="/dispatched"
                render={(props) => <ProductsList {...props} status='dispatched'/>}
          />
          <Route path="/cancelled"
                render={(props) => <ProductsList {...props} status='cancelled'/>}
          />
          <Route path="/yourorders"
                render={(props) => <YourOrdersList {...props}/>}
          /> 

          <Route path="/vendor/:vendorid" component={VendorProfile}/>

          {this.state.isAuthenticated ? 
          (<button onClick = {this.handleLogout}>Logout</button>):''  
          }
        </div>
      </Router>
    );
  }
}

