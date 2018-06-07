import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import AddPoll from './components/AddPoll';
import PollItem from './components/PollItem';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import { connect } from 'react-redux';
import { _getUsers, _getQuestions } from './utils/_DATA';
import { saveUsersToStore, saveQuestionsToStore } from './actions/root';


class App extends Component {
  
  componentDidMount = () => {
    _getUsers()
    .then(res => {
      console.log(res);
      this.props.saveUsersToStore(res);
    }
  );
    _getQuestions()
    .then(res => this.props.saveQuestionsToStore(res));
  }
  
  PrivateRoute = () => (
    <Fragment>
      { !this.props.authedUser ? <Redirect to='/login' /> : (
        <Fragment>
          <Header />
          <Nav />
          <Route path='/' exact component={Dashboard} />
          <Route path='/new' component={AddPoll} />
          <Route path='/questions/:id' component={PollItem} />
          <Route path='/leaderboard' component={Leaderboard} />
        </Fragment>
        )}
      </Fragment>
  )

  render() {
    return (
     <BrowserRouter> 
        <Switch>
          <Route path='/login' component={Login} />}
          <Route path='/' component={this.PrivateRoute} />}          
        </Switch>
     </BrowserRouter> 
    );
  }
}

function mapStateToProps (state) {
  return {
    authedUser: state.authedUser
  }
}

const mapDispatchToProps = dispatch => ({
  saveUsersToStore: (users) => dispatch(saveUsersToStore(users)),
  saveQuestionsToStore: (questions) => dispatch(saveQuestionsToStore(questions))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(App)
