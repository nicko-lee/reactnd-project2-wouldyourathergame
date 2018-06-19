import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class Leaderboard extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired,
    };

    // style stuff
    textStyle = {
        marginTop: '20px'
    }

    textContainer = {
        textAlign: 'center',
        paddingBottom: '15px'
    }

    render() {
        return (
            <div className="leaderboard">
                <div style={this.textContainer}>
                    <h2 style={this.textStyle}>Leaderboard</h2>
                    <h5 style={this.textStyle} className="text-muted">May the odds be ever in your favor...</h5>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Questions Asked</th>
                        <th>Questions Answered</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map((user, index) => (
                            <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>       
                                <img
                                    src={user.avatarURL}
                                    alt={`Avatar of ${user.name}`}
                                    className='avatar'
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.questions.length}</td>
                            {/* it doesn't make a diff if you used Object.keys or .values below here */}
                            <td>{Object.keys(user.answers).length}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
};

/* exporting a connected component not merely a component so that in App.js you can use that
   cos realise that the connect function takes in a component and returns a brand new component
   that React can render that takes in two params (read, write) basically
*/

const mapStateToProps = ({ users }) => {
    // helper function to calculate the userscore
    const userScore = user =>
      Object.keys(user.answers).length + user.questions.length
    
    // your normal return of a JS object in mapStateToProps but we just sorted it to boot
    return {
      // note that Object.values is exactly like Object.keys but it gives u the value not the key  
      users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
    }
  }

export default connect(mapStateToProps)(Leaderboard);