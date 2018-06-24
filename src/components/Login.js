import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { login, clearRedirectUrl } from '../actions/root';

class Login extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired,
        redirectUrl: PropTypes.string.isRequired,
        setAuthedUser: PropTypes.func.isRequired,
        clearRedirectUrl: PropTypes.func.isRequired
      };

    state = {
        selectedUser: "",
        pleaseSelectUserMsg: false 
    }

    // optional to mimic Facebook's behavior
    // componentDidMount = () => {
    //     if (this.state.selectedUser !== "") {
    //     this.props.history.push('/');
    //     }
    // }

    handleLogin = () => {
        if (this.state.selectedUser !== "") {
            this.props.setAuthedUser(this.state.selectedUser);
            // added this if statement because the UI was very buggy each time a user's entry point was /login
            this.props.redirectUrl === '/login' ? this.props.history.push('/') : this.props.history.push(`${this.props.redirectUrl}`);
            this.props.clearRedirectUrl();
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
        justifyContent: 'center',
        height: '280px',
        marginTop: '7em',
        padding: '20px 20px',
    }

    innerFormContainer = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '20em',
        textAlign: 'center',
        justifyContent: 'space-evenly',
        marginBottom: '0px',
        paddingRight: '20px',
        paddingLeft: '20px',
        backgroundColor: '#f8f9fa',
        border: '1px solid rgba(0,0,0,.125)'
    }

    render() {
        return (
            <div className='login-container' style={this.formContainer}>
                <div className='login-form' style={this.innerFormContainer}>
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
    users: state.users,
    redirectUrl: state.redirectUrl
})

// this guy updates the store
const mapDispatchToProps = dispatch => ({
    setAuthedUser: (selectedUser) => dispatch(login(selectedUser)),
    clearRedirectUrl: () => dispatch(clearRedirectUrl()) 
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Login);