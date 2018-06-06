import React, { Component } from 'react'
import { connect } from 'react-redux';

import { mockAction, anotherAction } from '../actions/root';

class Leaderboard extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.callSubtraction();
    }

    render() {
        return (
            <div className="leaderboard">
                <h1>Hi I am the Leaderboard</h1>
                <h2>Addition</h2>
                <h2>{this.props.addition}</h2>
                <h2>Subtraction</h2>
                <h2>{this.props.subtraction}</h2>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    addition: state.mock,
    subtraction: state.another
})

const mapDispatchToProps = dispatch => ({
    callAddition: () => dispatch(mockAction(555)),
    callSubtraction: () => dispatch(anotherAction())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);