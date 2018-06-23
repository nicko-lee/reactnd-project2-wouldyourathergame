import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { setRedirectUrl, clearRedirectUrl } from '../actions/root';
import Dashboard from './Dashboard';
import AddPoll from './AddPoll';
import InteractivePollItem from './InteractivePollItem';
import Leaderboard from './Leaderboard';
import Notfound from './Notfound';
import Nav from './Nav';
import { LoadingBar } from 'react-redux-loading-bar';
import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types'


class PrivateRoute extends Component {
    static propTypes = {
        setRedirectUrl: PropTypes.func.isRequired,
        clearRedirectUrl: PropTypes.func.isRequired,
        authedUser: PropTypes.string.isRequired,
        currentUrl: PropTypes.string.isRequired,
        redirectUrl: PropTypes.string.isRequired
    };

    componentDidMount = () => {
        if(this.props.authedUser === ""){
            this.props.setRedirectUrl(this.props.currentUrl);
            this.props.history.push('/login'); // switch pages
        }

        if(this.props.authedUser !== "" && this.props.redirectUrl !== ""){
            this.props.history.push(`${this.props.redirectUrl}`);
            this.props.clearRedirectUrl();

        }
    }

    render() {
        return (
            <div className='container-fluid'>
                {this.props.authedUser !== "" && (
                <Fragment>
                <Nav />
                <LoadingBar style={{backgroundColor: "blue"}}/>
                <Route path='/' exact component={Dashboard} />
                <Route path='/new' component={AddPoll} />
                <Route path='/questions/:id' component={InteractivePollItem} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/dud' component={Notfound} />
                </Fragment>)}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    authedUser: state.authedUser,
    currentUrl: ownProps.location.pathname,
    redirectUrl: state.redirectUrl
})

// this guy updates the store
const mapDispatchToProps = dispatch => ({
    setRedirectUrl: (url) => dispatch(setRedirectUrl(url)),
    clearRedirectUrl: () => dispatch(clearRedirectUrl())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
