import React from 'react';
import {axiosWithAuth} from './../utils/axiosWithAuth';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();

    // make post request and send the credentials object to the api

    axiosWithAuth()
    .post('/api/login', this.state.credentials)
    .then(res => {
      //always consolelog first so you know what to do with it!
      window.localStorage.setItem('token', res.data.payload); 
      // navigate user to /protected (or whatever landing page)
      this.props.history.push('/protected'); 
    })
    .catch(err => console.log(err))
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
