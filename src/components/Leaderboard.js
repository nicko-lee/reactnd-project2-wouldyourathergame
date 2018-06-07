import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mockAction, anotherAction } from '../actions/root';

class Leaderboard extends Component {
    static propTypes = {
        addition: PropTypes.number.isRequired,
        subtraction: PropTypes.number.isRequired,
        callAddition: PropTypes.func.isRequired,  
        callSubtraction: PropTypes.func.isRequired
      };

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

/* exporting a connected component not merely a component so that in App.js you can use that
   cos realise that the connect function takes in a component and returns a brand new component
   that React can render
*/
export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);