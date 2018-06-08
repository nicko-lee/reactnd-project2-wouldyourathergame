
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/root';

class Nav extends Component {

  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Poll
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' activeClassName='active' onClick={this.props.removeAuthedUser}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeAuthedUser: () => dispatch(logout())
}) 

export default connect(mapDispatchToProps)(Nav)