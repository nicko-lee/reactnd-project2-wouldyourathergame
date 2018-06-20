import React, { Component } from 'react'
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
        let userAnsweredQuestionsArray = Object.keys(userAnsweredQuestions); // this gives us an array of the question ids
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

    // style stuff

    listStyle = {
        listStyleType: 'none',
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0px',
        justifyContent: 'center'

    }

    headerStyle = {
        paddingTop: '15px',
        paddingBottom: '10px',
        textAlign: 'center'
    }

    buttonStyle = {
        display: 'block',
        width: '220px',
        margin: '5px'
    }

    buttonContainer = {
        flexDirection: 'row',
        display: 'flex',
        paddingBottom: '25px',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }




    render() {
        return (
            <div className='container'>
                <div className='toggle-questions-container'>
                    <h2 style={this.headerStyle}>Home/Dashboard</h2>
                    <div style={this.buttonContainer}>
                        <button type='button' style={this.buttonStyle} className="btn btn-primary btn-sm" onClick={() => this.setState({toggleQuestions: "unanswered"})}>
                            UNANSWERED QUESTIONS
                        </button>

                        <button type='button' style={this.buttonStyle} className="btn btn-primary btn-sm" onClick={() => this.setState({toggleQuestions: "answered"})}>
                            ANSWERED QUESTIONS
                        </button>
                    </div>
                </div>    

                {this.state.toggleQuestions==="unanswered" ? 

                <div>
                    <ul style={this.listStyle} className='dashboard-list'>
                        {this.state.userUnansweredQuestions.map((id) => (
                        <li key={id}>
                            <PollItem id={id} />
                        </li>
                        ))}
                    </ul>
                </div>
            : <div>
                    <ul style={this.listStyle} className='dashboard-list'>
                        {this.state.userAnsweredQuestions.map((id) => (
                        <li key={id}>
                            <PollItem id={id} />
                        </li>
                        ))}
                    </ul>
              </div>

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