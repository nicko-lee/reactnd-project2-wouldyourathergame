import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import { connect } from 'react-redux';
import { _getUsers, _getQuestions } from './utils/_DATA';
import { saveUsersToStore, saveQuestionsToStore } from './actions/root';
import PrivateRoute from './components/PrivateRoute';
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    saveUsersToStore: PropTypes.func.isRequired,
    saveQuestionsToStore: PropTypes.func.isRequired
};

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
        <Fragment>
          <Route path='/login' component={Login} />
          <Route path='/' component={PrivateRoute} />
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

const mapDispatchToProps = dispatch => ({
  saveUsersToStore: (users) => dispatch(saveUsersToStore(users)),
  saveQuestionsToStore: (questions) => dispatch(saveQuestionsToStore(questions))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(App)
