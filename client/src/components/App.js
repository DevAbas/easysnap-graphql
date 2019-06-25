import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import SessionWrapperHOC from './SessionWrapperHOC';

// Components
import Header from './Header';
// Pages
import Home from './pages/Home/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Profile from './pages/Profile';

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Header session={session} />
      <Switch>
        <Route exact path='/' render={() => <Home session={session} />} />
        <Route path='/join' render={() => <Join refetch={refetch} />} />
        <Route path='/login' render={() => <Login refetch={refetch} />} />
        <Route path='/profile' render={() => <Profile session={session} />} />
        <Redirect to='/' />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = SessionWrapperHOC(Root);

function App() {
  return (
    <div className='container'>
      <RootWithSession />
    </div>
  );
}

export default App;
