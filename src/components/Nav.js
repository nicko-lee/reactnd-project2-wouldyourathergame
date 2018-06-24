import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/root';
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar';


class Nav extends Component {
    static propTypes = {
        removeAuthedUser: PropTypes.func.isRequired,
        authedUser: PropTypes.string.isRequired
    };

    // style stuff
    headerStyle = {
        fontWeight: '500',
        paddingTop: '13px'
    }

    innerContainerStyle = { // for using flex
        justifyContent: 'space-between'
    }

    navContainer = {
        justifyContent: 'center'
    }

    render() {
        return (
                <nav style={this.navContainer} className="navbar navbar-expand-lg navbar-light bg-light">
                    <h3 className="navbar-brand" style={this.headerStyle}>The "Would You Rather" Challenge</h3>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" style={this.innerContainerStyle} id="navbarText">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to='/' exact activeClassName='active'>
                            Home/Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/new' activeClassName='active'>
                            New Poll
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/leaderboard' activeClassName='active'>
                            Leaderboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/login' activeClassName='active' onClick={this.props.removeAuthedUser}>
                            Logout
                            </NavLink>
                        </li>
                        </ul>
                    <span><Avatar user={this.props.authedUser}/></span>
                    </div>
                </nav>

    )
}
}

function mapStateToProps (state) {
    return {
      authedUser: state.authedUser
    }
  }

const mapDispatchToProps = dispatch => ({
    removeAuthedUser: () => dispatch(logout())
  }) 
  
  export default connect(mapStateToProps, mapDispatchToProps)(Nav)
