import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Notfound from './components/Notfound';
import { connect } from 'react-redux';
import { _getUsers, _getQuestions } from './utils/_DATA';
import { saveUsersToStore, saveQuestionsToStore } from './actions/root';
import PrivateRoute from './components/PrivateRoute';

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
  
  render() {
    return (
     <BrowserRouter> 
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={PrivateRoute} />
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
