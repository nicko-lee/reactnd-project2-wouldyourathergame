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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Fragment>
            {true==true
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

export default App;
