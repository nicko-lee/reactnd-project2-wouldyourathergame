import React, { Component } from 'react'
import { _saveQuestion } from '../utils/_DATA';
import { addNewQuestionToStore, addNewQuestionIdToUser } from '../actions/root';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar' 

class AddPoll extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired,
        showLoading: PropTypes.func.isRequired,
        hideLoading: PropTypes.func.isRequired
      };

    state = {
        optionOne: '',
        optionTwo: '',
        validationMsg: null
    };

    handlePost = () => {
        // if pass validation save post to Redux store and redirect to home
        if (this.state.optionOne && this.state.optionTwo !== "") { 
            // so it won't show a validation msg in this case
            this.setState({ validationMsg: false });
            
            // preparing a question JS object to pass to _saveQuestion which is a utility that will format it nicely and give it an ID
            const question = {
                author: this.props.authedUser,
                optionOneText: this.state.optionOne,
                optionTwoText: this.state.optionTwo
            }

            this.props.showLoading(); // fire off showLoading
            _saveQuestion(question)
            .then(res => {
              this.props.addNewQuestionToStore(res);
              // above I was updating the questions slice of state, now update the user portion as well so they are in sync
              this.props.addNewQuestionIdToUser(res.id, this.props.authedUser);
              
              this.props.history.push('/'); // switch pages
              
              this.props.hideLoading(); // then when it comes back u shut it down
            })  
    } else {
        // some validation warning message to make sure both options are filled in
        this.setState({ validationMsg: true });
    }

}

    // style stuff

    textContainer = {
        textAlign: 'center',
        paddingBottom: '15px',
        paddingTop: '15px'
    }

    formContainer = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        width: '470px',
        justifyContent: 'center',
        padding: '30px',
        // alignSelf: 'center',
        border: '1px solid rgba(0,0,0,.125)'

    }

    outerFormContainer = {
        display: 'flex',
        justifyContent: 'center'
    }

    buttonContainer = {
        alignSelf: 'center'
    }

    buttonStyle = {
        marginTop: '25px'
    }

    inputStyle = {
        marginTop: '0px'
    }

    labelContainer = {
        textAlign: 'center',
        fontWeight: 'bold'
    }




    render() {
        return (
            <div className="poll-item">
                <div style={this.textContainer}>
                    <h2>Add New Poll</h2>
                    <h5 className="text-muted">Would you rather...</h5>
                </div>
                    <div style={this.outerFormContainer}>
                        <form style={this.formContainer}>
                            <span style={this.labelContainer}>Option One:</span><br />
                            <input 
                                type="text" 
                                placeholder="Enter first option..."
                                value={this.state.optionOne}
                                onChange={ (event) => this.setState({ optionOne: event.target.value })}
                                style={this.inputStyle}   
                            /> <br />
                            <span style={this.labelContainer}>Option Two:</span><br />
                            <input 
                                type="text" 
                                placeholder="Enter second option..."
                                value={this.state.optionTwo}
                                onChange={ (event) => this.setState({ optionTwo: event.target.value })} 
                                style={this.inputStyle} 
                            />
                            <p style={this.buttonContainer}>
                                <button style={this.buttonStyle} type="button" className="btn btn-primary btn-sm" onClick={this.handlePost}> 
                                    Post New Question
                                </button>
                            </p>
                            {this.state.validationMsg ===true && <p>Please enter both options</p> }
                        </form>
                    </div>
            </div>
        );
    }
}

// this guy reads from the store and makes it available locally on this component's props
function mapStateToProps (state) {
    return {
        authedUser: state.authedUser
    }
  }

// this guy updates the store
const mapDispatchToProps = dispatch => ({
    addNewQuestionToStore: (question) => dispatch(addNewQuestionToStore(question)),
    addNewQuestionIdToUser: (questionId, user) => dispatch(addNewQuestionIdToUser(questionId, user)), 
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(AddPoll);