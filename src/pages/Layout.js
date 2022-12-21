import './Layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import Home from './home/home';
import Navbar from './../components/navbar';
import ProductList from './productlist/productList';
import ProductDetail from './product_detail/product_detail';
import CheckOrder from './check_order/checkOrder';
import BillingInfo from './billingInfo/billingInfo';
import Checkout from './checkout/checkout';
import Footer from './../components/footer';
import Totop from './../components/toTop';
import AlertMessage from './../components/alertMessage';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";

export default function Layout() {
  const { path } = useRouteMatch();
  console.log(path);

  return (
    <div className="container-fluid layout px-0">
      <Navbar />
      <Switch>
        <Route exact path={`${path}`}>
          <Home />
        </Route>
        <Route path={`/productlist/:series`}>
          <ProductList />
        </Route>
        <Route path={`/productlist`}>
          <ProductList />
        </Route>
        <Route path={`/product_detail/:id`}>
          <ProductDetail />
        </Route>
        <Route path={`/checkorders`}>
          <CheckOrder />
        </Route>
        <Route path={`/billingInfo`}>
          <BillingInfo />
        </Route>
        <Route path={`/checkout/:id`}>
          <Checkout />
        </Route>
      </Switch>
      <AlertMessage />
      <Totop />
      <Footer />
    </div>
  )
}