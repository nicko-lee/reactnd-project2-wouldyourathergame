import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { login } from '../actions/root';

class Login extends Component {
    // static propTypes = {
    //     addition: PropTypes.number.isRequired,
    //     subtraction: PropTypes.number.isRequired,
    //     callAddition: PropTypes.func.isRequired,  
    //     callSubtraction: PropTypes.func.isRequired
    //   };

    // componentWillMount() {
    //     console.log(this.props.debug)
    // }

    render() {
        return (
            <div className="login">
                <h1>Hi I am the Login</h1>
                <ul>
                    <li>
                    <NavLink to='/' exact activeClassName='active' onClick={this.props.setAuthedUser}>
                        Login
                    </NavLink>
                    </li>
                </ul>
            </div>
            )

    };

}

const mapStateToProps = (state) => ({
    addition: state.mock,
    subtraction: state.another
})

// this guy updates the store
const mapDispatchToProps = dispatch => ({
    setAuthedUser: () => dispatch(login('Jimbo')) 
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Login);