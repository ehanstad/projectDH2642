import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import "./auth.css";

class LogIn extends Component {
  state = {
    loading: false,
    username: '',
    password: '',
    message: null
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthorized } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAILURE') {
        this.setState({ message: error.message.message });
      } else {
        this.setState({ message: null });
      }
    }

    if (this.state.loading) {
      if (isAuthorized) {
        this.toggleErrAndLoad();
      }
    }
  }

  toggleErrAndLoad = () => {
    this.props.clearErrors();
    this.setState({
      loading: !this.state.loading
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    e.target.reset();
    this.setState({
      loading: true,
      message: null
    }); 
    const { username, password } = this.state;
    const user = { username, password };
    this.props.login(user);
  };

  render() {
    let status = null; 
    let errorMessage = null; 

    if (this.state.loading) {
      status = <div className={"loader-wrapper"}> <div className={"loader-auth"}></div></div>
    } else {
      status = <li className="submit"> <button type="submit">Login</button></li> ; 
    }

    if (this.state.message && this.state.loading) {
      errorMessage = <p className="authErrorAlert">{this.state.message}</p>
      status = <li className="submit"> <button type="submit">Login</button></li> ; 
    } else {
      errorMessage = null; 
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <ul className="flex-outer">
            <div className="form-title">
              <label>Member Login</label>
            </div>
            <li>
              <label>Username</label>
              <input name="username" id="username" type="text" placeholder="Enter username" onChange={this.onChange} required></input>
            </li>
            <li>
              <label>Password</label>
              <input name="password" id="password" type="password" placeholder="Enter Password" onChange={this.onChange} required></input>
            </li>
            {status}
            {errorMessage}
          </ul>   
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuthorized,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LogIn);