import React, { Component, Fragment } from 'react'
import PollItem from './PollItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


class Dashboard extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired,
        users: PropTypes.object.isRequired,
        questionIds: PropTypes.array.isRequired // this has ALL the questions from everyone globally
    };
    
    state = {
        toggleQuestions: "unanswered",
        userAnsweredQuestions: [], // this has only the questions the user has answered
        userUnansweredQuestions: []
    }

    componentDidMount() {
        this.sortUserQuestions();
    }
    
    sortUserQuestions = () => {
        let userAnsweredQuestions = this.props.users[this.props.authedUser].answers;
        let userAnsweredQuestionsArray = Object.keys(userAnsweredQuestions); // this gives us an array of the queestion ids
        this.setState({ userAnsweredQuestions: userAnsweredQuestionsArray });

        let userUnansweredQuestions = this.array_diff(userAnsweredQuestionsArray, this.props.questionIds);
        this.setState({ userUnansweredQuestions: userUnansweredQuestions });
    }

    array_diff = (a1, a2) => {
        let a = [], diff = [];
        for (let i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
        for (let i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
        for (let k in a) {
            diff.push(k);
        }
        return diff;
    }

    render() {
        return (
            <div className="dashboard">
                <h1>Hi I am the Dashboard</h1>
                <div className="toggle-questions">
                    <button type='button' onClick={() => this.setState({toggleQuestions: "unanswered"})}>
                        UNANSWERED QUESTIONS
                    </button>
                    <button type='button' onClick={() => this.setState({toggleQuestions: "answered"})}>
                        ANSWERED QUESTIONS
                    </button>
                </div>    
                {this.state.toggleQuestions==="unanswered" ? 
                    <Fragment>
                        <ul className='dashboard-list'>
                            {this.state.userAnsweredQuestions.map((id) => (
                            <li key={id}>
                                <PollItem id={id}/>
                            </li>
                            ))}
                        </ul>
                    </Fragment>
                  : <Fragment>
                        <ul className='dashboard-list'>
                            {this.state.userUnansweredQuestions.map((id) => (
                            <li key={id}>
                                <PollItem id={id}/>
                            </li>
                            ))}
                        </ul>
                    </Fragment>
                }
            </div>
            )
    }
}

function mapStateToProps (state) {
    return {
        authedUser: state.authedUser,
        users: state.users,
        questionIds: Object.keys(state.questions) // this gives us an array of Ids
    }
  }

export default connect(mapStateToProps)(Dashboard)