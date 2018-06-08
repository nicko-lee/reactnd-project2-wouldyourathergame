import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Avatar extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired
      };

    render() {
        return (
            <div className="avatar">
                <h1>Hi I am {this.props.authedUser}</h1>
            </div>
        );
    }
};

function mapStateToProps (state) {
    return {
      authedUser: state.authedUser
    }
  }

/* exporting a connected component not merely a component so that in App.js you can use that
   cos realise that the connect function takes in a component and returns a brand new component
   that React can render
*/
export default connect(mapStateToProps)(Avatar)