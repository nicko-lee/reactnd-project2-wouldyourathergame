import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { _saveQuestionAnswer } from '../utils/_DATA';
import { addNewUserAnswerToStore, updateQuestionToBeAwareOfUserAnswer } from '../actions/root';
import { showLoading, hideLoading } from 'react-redux-loading-bar' 
import Avatar from '../components/Avatar';


class InteractivePollItem extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired,
        question: PropTypes.object.isRequired,
        userAnswer: PropTypes.string.isRequired
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
        
        // updating mock DB so backend is in sync with front end
        _saveQuestionAnswer(questionAnswer)
        .then(res => {

            // updating users slice of state in Redux
            this.props.addNewUserAnswerToStore(questionAnswer);

            // updating questions slice of state in Redux
            this.props.updateQuestionToBeAwareOfUserAnswer(questionAnswer);

            this.props.history.push('/'); // switch pages
            this.props.hideLoading(); // then when it comes back u shut it down
             }
        );
    }

    calculateQuestionStats = () => {
        const optionOne = this.props.question.optionOne.votes.length;
        const optionTwo = this.props.question.optionTwo.votes.length;
        const sumOfVotes = optionOne + optionTwo;

        const optionOnePercentage = optionOne/sumOfVotes * 100;
        const optionTwoPercentage = optionTwo/sumOfVotes * 100;

        return {
            optionOnePercentage: Math.round(optionOnePercentage),
            optionTwoPercentage: Math.round(optionTwoPercentage),
            optionOne,
            optionTwo
        }

    }

    cardStyle = {
        width: '20rem'
    }

    render() {
        return (
            <div className="poll-item">
                {this.props.userAnswer !== 'You haven\'t answered this yet'
                ? 
                <Fragment>              
                    <Avatar user={this.props.question.author}/>
                    <p>{this.formatDate()}</p>
                    <h2>Would You Rather...</h2>
                    <p>{this.props.question.optionOne.text}</p>
                    <p>{this.calculateQuestionStats().optionOnePercentage + "%"}</p>
                    <p>{this.calculateQuestionStats().optionOne + " votes cast"}</p>
                    <p>{this.props.question.optionTwo.text}</p>
                    <p>{this.calculateQuestionStats().optionTwoPercentage + "%"}</p>
                    <p>{this.calculateQuestionStats().optionTwo + " votes cast"}</p>
                    <p>{"You answered " + this.props.userAnswer}</p>
                </Fragment>
                : 
                <Fragment>
           
                    <div className="card" style={this.cardStyle}>
                        <div className="card-body">
                            <h5 className="text-muted">Question asked by...</h5>
                            <Avatar user={this.props.question.author}/>
                            <p>{this.formatDate()}</p>
                            <h5 className="card-title">Would you rather...</h5>
                            <div className="card-text">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" id="optionOne" name="option" value="optionOne" onChange={this.setSelectedOption}/>
                                            <label>{this.props.question.optionOne.text}</label><br/>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.setSelectedOption}/>
                                            {this.props.question.optionTwo.text}<br/>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSubmitVote}> 
                                    Submit Vote
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>

                }
  
            </div>
        );

    }
}  

const mapStateToProps = (state, ownProps) => ({
    question: state.questions[ownProps.match.params.id],
    authedUser: state.authedUser,
    userAnswer: state.users[state.authedUser].answers[ownProps.match.params.id] || 'You haven\'t answered this yet'
})

// this guy updates the store
const mapDispatchToProps = dispatch => ({
    addNewUserAnswerToStore: (answer) => dispatch(addNewUserAnswerToStore(answer)),
    updateQuestionToBeAwareOfUserAnswer: (answer) => dispatch(updateQuestionToBeAwareOfUserAnswer(answer)),
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(InteractivePollItem);


