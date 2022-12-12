import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { checkLoggedIn } from './slices/userSlice';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/_utilities.scss';

//pages
import Login from './pages/login/login';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';

function App() {
  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(checkLoggedIn(''));
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            {user.token && <Redirect to="/dashboard" />}
            {!user.token && <Login />}
          </Route>
          <Route path="/dashboard" >
            {!user.token && <Redirect to="/login" />}
            {user.token && <Dashboard />}
          </Route>
          <Route path="/">
            <Layout />
          </Route>
        </Switch>
      </BrowserRouter>
    
      
    </div>
  );
}

export default App;
