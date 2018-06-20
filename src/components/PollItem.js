import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class PollItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        question: PropTypes.object.isRequired
    };


// style stuff
cardStyle = {
    width: '20rem',
    padding: '10px 10px 5px 10px',
    margin: '10px',
    backgroundColor: '#f8f9fa',
    minHeight: '15em'
}

listStyle = {
    paddingBottom: '20px'
}

    render() {
        return (
            <Fragment>
           
            <div className="card" style={this.cardStyle}>
                <div className="card-body">
                    <h5 className="card-title">Would you rather...</h5>
                        <ul className="card-text" style={this.listStyle}>
                            <li>
                                {this.props.question.optionOne.text}
                            </li>
                            <li>
                                {this.props.question.optionTwo.text}
                            </li>       
                        </ul>  
                    <NavLink to={`/questions/${this.props.question.id}`}> Click here to vote... </NavLink>
                </div>
            </div>
            
            </Fragment>
        );
    }
}  


const mapStateToProps = (state, ownProps) => ({
    question: state.questions[ownProps.id]
})

export default connect(mapStateToProps)(PollItem);