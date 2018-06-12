import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { _saveQuestionAnswer } from '../utils/_DATA';
import { addNewUserAnswerToStore, updateQuestionToBeAwareOfUserAnswer } from '../actions/root';
import { showLoading, hideLoading } from 'react-redux-loading-bar' 
import Avatar from '../components/Avatar';


class InteractivePollItem extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired,
        question: PropTypes.object.isRequired
    };

    state = {
        selectedOption: ""
    }

    setSelectedOption = (e) => {
        this.setState({ selectedOption: e.target.value});
    }

    formatDate = () => {
        const date = new Date(this.props.question.timestamp);
        const time = date.toLocaleTimeString("en-US")
        return `${time.substr(0, 5) + time.slice(-2)} | ${date.toLocaleDateString()}`
    }

    handleSubmitVote = () => {
        // fire off showLoading for loading bar
        this.props.showLoading(); 

        // prepare an object to pass into Redux and mock DB
        const questionAnswer = {     
            authedUser: this.props.authedUser,
            qid: this.props.question.id,
            answer: this.state.selectedOption
        }

        // updating users slice of state in Redux
        this.props.addNewUserAnswerToStore(questionAnswer);

        // updating questions slice of state in Redux
        this.props.updateQuestionToBeAwareOfUserAnswer(questionAnswer);

        
        // updating mock DB so backend is in sync with front end
        _saveQuestionAnswer(questionAnswer)
        .then(res => {
            this.props.history.push('/'); // switch pages
            this.props.hideLoading(); // then when it comes back u shut it down
        }


        );
    }

    render() {
        return (
            <div className="poll-item">
                <Avatar user={this.props.question.author}/>
                <p>{this.formatDate()}</p>
                <h2>Would You Rather...</h2>
                        <input type="radio" id="optionOne" name="option" value="optionOne" onChange={this.setSelectedOption}/>
                        <label>{this.props.question.optionOne.text}</label>

                        <input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.setSelectedOption}/>
                        <label>{this.props.question.optionTwo.text}</label>

                        <button type="button" onClick={this.handleSubmitVote}> 
                            Submit Vote
                        </button>
  
            </div>
        );

    }
}  

const mapStateToProps = (state, ownProps) => ({
    question: state.questions[ownProps.match.params.id],
    authedUser: state.authedUser
})

// this guy updates the store
const mapDispatchToProps = dispatch => ({
    addNewUserAnswerToStore: (answer) => dispatch(addNewUserAnswerToStore(answer)),
    updateQuestionToBeAwareOfUserAnswer: (answer) => dispatch(updateQuestionToBeAwareOfUserAnswer(answer)),
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(InteractivePollItem);


