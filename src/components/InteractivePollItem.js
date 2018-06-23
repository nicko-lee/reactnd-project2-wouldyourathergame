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
        selectedOption: "",
        pleaseSelectOptionMsg: false 

    }

    setSelectedOption = (e) => {
        this.setState({ 
            selectedOption: e.target.value,
            pleaseSelectOptionMsg: false
        });
    }

    formatDate = () => {
        const date = new Date(this.props.question.timestamp);
        const time = date.toLocaleTimeString("en-US")
        return `${time.substr(0, 5) + time.slice(-2)} | ${date.toLocaleDateString()}`
    }

    handleSubmitVote = () => {
        if (this.state.selectedOption !== "") {
            // toggle validation message off
            this.setState({ pleaseSelectOptionMsg: false });
            
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

                this.props.history.push(`/questions/${this.props.question.id}`); // switch view to Answered View
                this.props.hideLoading(); // then when it comes back u shut it down
                }
            );
        } else {
                // some validation warning message to make sure an option is selected
                this.setState({ pleaseSelectOptionMsg: true });
        }
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

    // style stuff

    cardOuterContainer = {
        // padding: '10px'
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '25px'
    }

    cardInnerContainer = {
        backgroundColor: '#f8f9fa',
        display: 'flex',
        flexDirection: 'column',
        // width: '100% !important'
        padding: '2.5rem 5rem !important' 

    }

    buttonContainer = {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px'

    }

    headerStyle = {
        textAlign: 'center',
        paddingTop: '25px'
    }

    subHeaderStyle = {
        textAlign: 'center',
        paddingTop: '7px'
    }

    timeContainer = {
        paddingTop: '15px',
        paddingBottom: '5px'
    }

    labelTextStyle = {
        paddingLeft: '10px'
    }

    progressBar = (option) => {
        const questionStats = this.calculateQuestionStats();

        return {
            height: '24px',
            width: option === "optionOne" ? `${questionStats.optionOnePercentage}%` : `${questionStats.optionTwoPercentage}%`,
            border: '1px solid rgba(0,0,0,.125)',
            backgroundColor: '#007bff'
        }
    }

    progressBarContainer = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#afcbef'
    }

    progressBarLabel = {
        marginBottom: '5px',
        marginTop: '10px',
        fontWeight: 'bolder'
    }


    render() {
        return (
            <div className="poll-item">
                {this.props.userAnswer !== 'You haven\'t answered this yet'
                ? 
                <Fragment>  
                    <h2 style={this.headerStyle}>Question stats</h2>
                    <h5 className="text-muted" style={this.subHeaderStyle}>Question asked by:</h5>
                    <div style={this.cardOuterContainer}>
                        <div className="card">
                            <div style={this.cardInnerContainer} className="card-body-back">
                                <Avatar user={this.props.question.author}/>
                                <p style={this.timeContainer}><b>Date</b>: {this.formatDate()}</p>
                                <h2>Would You Rather...</h2>
                                <p style={this.progressBarLabel}>{this.props.question.optionOne.text}</p>
                                <div style={this.progressBarContainer}>
                                    <div style={this.progressBar("optionOne")}></div>
                                </div>
                                <label>{this.calculateQuestionStats().optionOne + " votes cast"} | {this.calculateQuestionStats().optionOnePercentage + "%"}</label>
                                
                                <p style={this.progressBarLabel}>{this.props.question.optionTwo.text}</p>
                                <div style={this.progressBarContainer}>
                                    <div style={this.progressBar("optionTwo")}></div>
                                </div>
                                <p>{this.calculateQuestionStats().optionTwo + " votes cast"} | {this.calculateQuestionStats().optionTwoPercentage + "%"} </p>
                                <p>{`You answered: "${this.props.question[this.props.userAnswer].text}"`}</p>
                            </div>
                        </div>
                    </div>
                </Fragment>
                : 
                <Fragment>
                    <h2 style={this.headerStyle}>Question asked by:</h2>
                    <div style={this.cardOuterContainer}>
                    <div className="card">
                        <div className="card-body-front" style={this.cardInnerContainer}>
                            <Avatar user={this.props.question.author}/>
                            <p style={this.timeContainer}><b>Date</b>: {this.formatDate()}</p>
                            <h4 className="card-title">Would you rather...</h4>
                            <div className="card-text">

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div>
                                            <input type="radio" id="optionOne" name="option" value="optionOne" onChange={this.setSelectedOption}/>
                                            <label style={this.labelTextStyle}>{this.props.question.optionOne.text}</label><br/>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div>
                                            <input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.setSelectedOption}/>
                                            <label style={this.labelTextStyle}>{this.props.question.optionTwo.text}</label><br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={this.buttonContainer}>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSubmitVote}> 
                                        Submit Vote
                                    </button>
                            </div>
                            {this.state.pleaseSelectOptionMsg ===true && <p>Please select an option</p> }
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


