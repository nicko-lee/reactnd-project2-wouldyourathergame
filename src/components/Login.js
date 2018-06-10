import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { login } from '../actions/root';

class Login extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired,
      };

    state = {
        selectedUser: "",
        pleaseSelectUserMsg: false 
    }

    handleLogin = () => {
        if (this.state.selectedUser !== "") {
            this.props.history.push('/');
            this.props.setAuthedUser(this.state.selectedUser);
        } else {
            this.setState({ pleaseSelectUserMsg: true })
        }
    }

    handleSelection = (e) => {
        this.setState({ selectedUser: e.target.value })
    }

    render() {
        return (
            <div className="login">
                <h1>Hi I am the Login</h1>
                
                <button type='button' onClick={this.handleLogin}>
                    Login
                </button>
                <select value={this.state.selectedUser} onChange={this.handleSelection}>
                    <option value="" disabled>Select User...</option> 
                    <option value="aragorn">Aragorn Son of Arathorn</option>
                    <option value="gandalf">Gandalf the White</option>
                    <option value="legolas">Legolas</option>
                </select>
                {this.state.pleaseSelectUserMsg && this.state.selectedUser ==="" && <p>Please select a user</p> }
            </div>
            )

    };

}

const mapStateToProps = (state) => ({
    users: state.users
})

// this guy updates the store
const mapDispatchToProps = dispatch => ({
    setAuthedUser: (selectedUser) => dispatch(login(selectedUser)) 
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Login);