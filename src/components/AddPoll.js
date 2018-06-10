import React, { Component } from 'react'
import { _saveQuestion } from '../utils/_DATA';
import { addNewQuestionToStore, addNewQuestionIdToUser } from '../actions/root';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class AddPoll extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired,
      };

    state = {
        optionOne: '',
        optionTwo: '',
        validationMsg: null
    };


    handlePost = () => {
        // if pass validation save post to Redux store and redirect to home
        if (this.state.optionOne && this.state.optionTwo !== "") { 
            // preparing a question JS object to pass to _saveQuestion which is a utility that will format it nicely and give it an ID
            const question = {
                author: this.props.authedUser,
                optionOneText: this.state.optionOne,
                optionTwoText: this.state.optionTwo
            }
            _saveQuestion(question)
            .then(res => {
              this.props.addNewQuestionToStore(res);
              // above I was updating the questions slice of state, now update the user portion as well so they are in sync
              this.props.addNewQuestionIdToUser(res.id, this.props.authedUser);
            }).then( () => {
              this.setState({ validationMsg: false });
              this.props.history.push('/');
            })
    } else {
        // some validation warning message to make sure both options are filled in
        this.setState({ validationMsg: true });
    }

}

    render() {
        return (
            <div className="poll-item">
                <h1>Hi I am the AddPoll</h1>
                <h2>Would you rather...</h2>
                <form>
                    Option One: <br />
                    <input 
                        type="text" 
                        placeholder="Enter first option..."
                        value={this.state.optionOne}
                        onChange={ (event) => this.setState({ optionOne: event.target.value })}  
                    /> <br />
                    Option Two: <br />
                    <input 
                        type="text" 
                        placeholder="Enter second option..."
                        value={this.state.optionTwo}
                        onChange={ (event) => this.setState({ optionTwo: event.target.value })}  
                    />
                    <p>
                        <button type="button" onClick={this.handlePost}> 
                            Post New Question
                        </button>
                    </p>
                    {this.state.validationMsg ===true && <p>Please enter both options</p> }
                </form>
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
    addNewQuestionIdToUser: (questionId, user) => dispatch(addNewQuestionIdToUser(questionId, user))  
}) 

export default connect(mapStateToProps, mapDispatchToProps)(AddPoll);