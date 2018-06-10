import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Avatar extends Component {
    static propTypes = {
        authedUser: PropTypes.string.isRequired,
        userInfo: PropTypes.object.isRequired
      };

    render() {
        return (
            <div className="avatar">
                <img
                    src={this.props.userInfo.avatarURL}
                    alt={`Avatar of ${this.props.userInfo.name}`}
                    className='avatar'
                />
                <h1>Hi I am {this.props.authedUser}</h1>
            </div>
        );
    }
};

function mapStateToProps (state, ownProps) {
    return {
      userInfo: state.users[ownProps.authedUser]
    }
  }

/* exporting a connected component not merely a component so that in App.js you can use that
   cos realise that the connect function takes in a component and returns a brand new component
   that React can render
*/
export default connect(mapStateToProps)(Avatar)