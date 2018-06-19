import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import AddPoll from './components/AddPoll';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import Notfound from './components/Notfound';
import LoadingBar from 'react-redux-loading-bar'
import { connect } from 'react-redux';
import { _getUsers, _getQuestions } from './utils/_DATA';
import { saveUsersToStore, saveQuestionsToStore } from './actions/root';
import InteractivePollItem from './components/InteractivePollItem';

class App extends Component {
  
  componentDidMount = () => {
    _getUsers()
    .then(res => {
      
      this.props.saveUsersToStore(res);
    }
  );
    _getQuestions()
    .then(res => {
      this.props.saveQuestionsToStore(res);
    })
  }
  
  PrivateRoute = () => (
    <div className='container-fluid'>
      { this.props.authedUser === "" ? <Redirect to='/login' /> : (
        <Fragment>
          <Nav />
          <LoadingBar style={{backgroundColor: "blue"}}/>
          <Route path='/' exact component={Dashboard} />
          <Route path='/new' component={AddPoll} />
          <Route path='/questions/:id' component={InteractivePollItem} />
          <Route path='/leaderboard' component={Leaderboard} />
        </Fragment>
        )}
      </div>
  )

  
  render() {
    return (
     <BrowserRouter> 
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={this.PrivateRoute} />
          <Route component={Notfound} />          
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
