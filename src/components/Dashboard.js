import React, { Component } from 'react'
import PollItem from './PollItem';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <h1>Hi I am the Dashboard</h1>
                <ul className='dashboard-list'>
                    {this.props.questionIds.map((id) => (
                    <li key={id}>
                        <PollItem id={id}/>
                    </li>
                    ))}
                 </ul>
            </div>
            )
    }
}

function mapStateToProps ({ questions }) {
    return {
      questionIds: Object.keys(questions) // this gives us an array of Ids
    }
  }

export default connect(mapStateToProps)(Leaderboard)