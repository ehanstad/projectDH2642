import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './navBar.css';

import SearchBar from '../search/searchBar'
import LogOut from '../auth/logOut';

class NavBar extends Component {

  render() {
    const { isAuthorized, user } = this.props.auth;

    const userMenu = (
        <div className="navBar">
            <strong>{user ? `Welcome ${user.username}!` : ''}</strong>
            <NavLink className="navBar-text" activeClassName="selected" to="/profile">Profile</NavLink>
            <NavLink className="navBar-text" activeClassName="selected" to="/table">Table</NavLink>
            <NavLink className="navBar-text" activeClassName="selected" to="/schedule">Schedule</NavLink>
            <SearchBar/>
            <LogOut />
        </div>
    );

    const guestMenu = (
      <div>
            <strong>Please login to access the tools</strong>
      </div>
    );

    return (
      <div className={"navBar-container"}>
            {isAuthorized? userMenu: guestMenu}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(NavBar);
