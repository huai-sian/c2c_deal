import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn, checkExpAuth, getTokenFromLocal, getUserFromLocal } from './../slices/userSlice';
import Orders from './back_orders/orders'
import Sidebar from './../components/sidebar.js';
import Products from './back_products/products';
import Coupons from './back_coupons/coupons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import './Dashboard.scss';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();     
  const { user, loggedIn } = useSelector((store) => store.user);


  const token = document.cookie.replace(/(?:(?:^|.*;\s*)pureSavonVuex\s*=\s*([^;]*).*$)|^.*$/, '$1')
  axios.defaults.headers.common.Authorization = `${token}`;

  useEffect(() => {
    dispatch(getUserFromLocal());
    dispatch(getTokenFromLocal());
    console.log(user);
    dispatch(checkExpAuth());
}, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar/>
        <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-4">
          <Switch>
            <Route exact path={`${path}`}>
              {user.token && <Products></Products>}
              {!user.token&& <Redirect to="/login" />}
            </Route>
            <Route path={`${path}/orders`}>
              {user.token&& <Orders></Orders>}
              {!user.token&& <Redirect to="/login" />}
            </Route>
            <Route path={`${path}/coupons`}>
              {user.token && <Coupons></Coupons>}
              {!user.token && <Redirect to="/login" />}
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  )
}