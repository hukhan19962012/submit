import React, { useEffect, useMemo } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { handleData } from '../func/shared';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { LoadingBar } from 'react-redux-loading-bar';
import Login from './Login';

let questionsPrefix = '/questions/'

export const App = ({ loading, loggedIn, questions, qid }) => {



 useMemo(() => {
    dispatchEvent(handleData())
  }, [])


  return (
    <>
      <LoadingBar />
      {loading ? null :
        <>
          <Switch>
            <Route exact path='/login' component={Login} />
            {/* <Route component={ErrorPage} /> */}
          </Switch>
        </>}
    </>)
}


function mapStateToProps({ users, questions, authUser, }, { location }) {

  return {
    loading: (users.length === 0 && users.constructor === Object) || (questions.length === 0 && questions.constructor === Object),
    loggedIn: authUser !== null,
    questions,
    qid: location.pathname.substring(questionsPrefix.length)
  }
}

export default withRouter(connect(mapStateToProps)(App))
