import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button } from './UI-Styles';
import './form.scss';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isAuth: false
    };
  }

  login = credentials => {
    return axios
      .post('http://localhost:4000/api/auth/login', {
        data: credentials,
        withCredentials: true
      })
      .then(
        this.setState({
          isAuth: true
        })
      )
      .catch(err => console.log(err));
  };

  handleChange = evt => {
    evt.preventDefault();

    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    this.login(this.state).then(() => {
      // Pushes user to dashboard page upon successful login attempt
      this.props.history.push('/success');
    });
    // Awaits Login, goes through reducer and sets auth
    // if isAuth is true, right hand side of && runs
    // if isAuth is false, right hand will not run
  };

  render() {
    const { username, password } = this.state;

    if (this.props.isAuth) {
      return <Redirect to='/success' />;
    }

    return (
      <div className='login-component-bg'>
        <div className='login-component'>
          <img
            src={require('../star-labs.png')}
            alt='Star Labs Logo'
            className='logo'
          />

          <form onSubmit={this.handleSubmit} className='login-form'>
            <h3 className='login-title'>Log In to Your Account</h3>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={username}
              onChange={this.handleChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={this.handleChange}
              required
            />
            <Button type='submit'>Login</Button>
            <p className='signup'>
              Need an Account?
              <NavLink exact to='/adduser' className='signup-link'>
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Form);
