import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import AddPoll from './components/AddPoll';
import PollItem from './components/PollItem';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import { connect } from 'react-redux';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
          <Fragment>
            {this.props.authedUser
            ? <div>
                <Header />
                <Nav />
                <Route path='/' exact component={Dashboard} />
                <Route path='/new' component={AddPoll} />
                <Route path='/questions/:id' component={PollItem} />
                <Route path='/leaderboard' component={Leaderboard} />
              </div>
            : <Route path='/login' component={Login} />}
          </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps (state) {
  return {
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(App)
