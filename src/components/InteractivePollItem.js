import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class InteractivePollItem extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired
    };

    handleSubmitVote = () => {

    }

    render() {
        return (
            <div className="poll-item">
                <h2>Would You Rather...</h2>
                        <input type="radio" id="optionOne" name="option" value={this.props.question.optionOne.text}/>
                        <label>{this.props.question.optionOne.text}</label>

                        <input type="radio" id="optionTwo" name="option" value={this.props.question.optionTwo.text}/>
                        <label>{this.props.question.optionTwo.text}</label>

                        <button type="button" onClick={this.handleSubmitVote}> 
                            Submit Vote
                        </button>
  
            </div>
        );

    }
}  

const mapStateToProps = (state, ownProps) => ({
    question: state.questions[ownProps.match.params.id]
})

export default connect(mapStateToProps)(InteractivePollItem);