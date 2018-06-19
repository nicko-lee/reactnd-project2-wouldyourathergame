import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Avatar extends Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        userInfo: PropTypes.object.isRequired
      };

    // style stuff

    avatarContainer = {
        display: 'flex',
        flexDirection: 'row'
    }

    textStyle = {
        padding: '15px'
    }

    render() {
        return (
                <div style={this.avatarContainer}> 
                        <img className="avatar"
                            src={this.props.userInfo.avatarURL}
                            alt={`Avatar of ${this.props.userInfo.name}`}
                        />
                        <h6 style={this.textStyle}className="text-muted">{this.props.userInfo.name}</h6>
          
                </div>

            
        );
    }
};

function mapStateToProps (state, ownProps) {
    return {
      userInfo: state.users[ownProps.user]
    }
  }

/* exporting a connected component not merely a component so that in App.js you can use that
   cos realise that the connect function takes in a component and returns a brand new component
   that React can render
*/
export default connect(mapStateToProps)(Avatar)