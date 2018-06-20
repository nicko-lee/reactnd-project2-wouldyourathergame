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

    // style stuff

    buttonStyle = {
        margin: '20px',
        width: '90px',
        alignSelf: 'center'
    }

    textStyle = {
        textAlign: 'center'
    }

    formContainer = {
        display: 'flex',
        width: '550px',
        height: '280px',
        backgroundColor: '#f8f9fa',
        marginTop: '95px',
        padding: '15px',
        border: '1px solid rgba(0,0,0,.125)'
        

    }

    innerFormContainer = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        // backgroundColor: 'powderblue',
        textAlign: 'center',
        justifyContent: 'space-evenly',
        marginBottom: '0px',
        paddingRight: '20px',
        paddingLeft: '20px'

    }

    render() {
        return (
            <div className='container' style={this.formContainer}>
                <div className="form-group" style={this.innerFormContainer}>
                    <h2 style={this.textStyle} >Please login:</h2>
                    <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" value={this.state.selectedUser} onChange={this.handleSelection}>
                        <option value="" disabled>Select User...</option> 
                        <option value="aragorn">Aragorn Son of Arathorn</option>
                        <option value="gandalf">Gandalf the White</option>
                        <option value="legolas">Legolas Prince of Mirkwood</option>
                    </select>
                    <button style={this.buttonStyle} type='button' className="btn btn-primary btn-md" onClick={this.handleLogin}>
                        Login
                    </button>
                    {this.state.pleaseSelectUserMsg && this.state.selectedUser ==="" && <p>Please select a user</p> }
                </div>
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