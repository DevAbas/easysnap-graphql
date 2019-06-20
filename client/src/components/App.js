import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Components
import Header from './Header';
// Pages
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';

const Root = () => (
  <Router>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/join' component={Join} />
        <Route path='/login' component={Login} />
        <Redirect to='/' />
      </Switch>
    </Fragment>
  </Router>
);

function App() {
  return (
    <div className='container'>
      <Root />
    </div>
  );
}

export default App;
