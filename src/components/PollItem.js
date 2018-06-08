import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class PollItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        question: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="poll-item">
                <h2>Would You Rather...</h2>
                <ul>
                    <li>
                        {this.props.question.optionOne.text}
                    </li>
                    <li>
                        {this.props.question.optionTwo.text}
                    </li>       

                </ul>    
            </div>
        );

    }
}  

const mapStateToProps = (state, ownProps) => ({
    question: state.questions[ownProps.id]
})

export default connect(mapStateToProps)(PollItem);