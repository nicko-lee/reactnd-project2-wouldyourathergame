import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { login } from '../actions/root';

class Login extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired,
      };

    handleLogin = () => {
        this.props.setAuthedUser();
        this.props.history.push('/');
    }



    render() {
        return (
            <div className="login">
                <h1>Hi I am the Login</h1>
                
                <button type='button' onClick={this.handleLogin}>
                    Login
                </button>
                <select>
                    <option disabled>Move to...</option>
                    <option value="aragorn">Aragorn Son of Arathorn</option>
                    <option value="gandalf">Gandalf the White</option>
                    <option value="legolas">Legolas</option>
                </select>
            </div>
            )

    };

}

const mapStateToProps = (state) => ({
    users: state.users
})

// this guy updates the store
const mapDispatchToProps = dispatch => ({
    setAuthedUser: () => dispatch(login('Jimbo')) 
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Login);