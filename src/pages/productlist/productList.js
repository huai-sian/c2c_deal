import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, renderSeriesList, updateWish, getWishLength, getWishFromLocal, getCurrentSeries } from './../../slices/productsSlice';
import { addTocart, getCartLength, getCartTotal, pushToCart, removeCart, updateCart, getCartLocal } from './../../slices/cartSlice';
import Img from '../../assets/images/vera-cho-10SLUJj6G6w-unsplash.jpg';
import Loading from './../../components/loading';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
  Redirect,
  useLocation
} from "react-router-dom";

import './productList.scss';

export default function ProductList() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { series } = useParams();

  const toDetail = (id) => {
    history.push(`/product_detail/${id}`);
  }

  const { products, allSeries, wish, wishLength, isLoading, currentSeries } = useSelector((store) => store.products)
  const { cart, cartlength } = useSelector((store) => store.cart)

  const changeSeries = (item) => {
    dispatch(getCurrentSeries(item));
    dispatch(getProducts(''));
  }

  useEffect(() => {
    // if(series) {
    //   dispatch(getCurrentSeries(series))
    // }
    dispatch(getProducts(''));
    dispatch(getWishFromLocal());
    dispatch(getWishLength());
    dispatch(getCartLocal());
    dispatch(getCartLength());
    dispatch(getCartTotal());
  }, [])

  const addTowish = (e, item) => {
    e.stopPropagation();
    console.log(item);
    dispatch(updateWish(item));
    dispatch(getWishFromLocal());
    dispatch(getWishLength());
    console.log(wish);
  }

  const getCartInfo = () => {
    dispatch(getCartLocal());
    dispatch(getCartLength());
    dispatch(getCartTotal());
  }

  const addItem = (e, item, qty = 1) => {
    e.stopPropagation();
    getCartInfo();
    dispatch(addTocart({ product: item, qty}));
    getCartInfo();
  }

  const isLiked = (want) => {
    const liked = wish.filter(item => item.id === want.id);
    if(liked.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const currency = (num) => {
    const n = Number(num)
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
      return currency
    })}`
  }

  if(isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className='container-fluid bannerimg'>
        <div className='series'>
          <ul>
            {allSeries && allSeries.map((item, i) => (
              <li 
                key={i}
                onClick={() => changeSeries(item)}
                className={`${item == currentSeries ? 'active' : ''}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-fluid productContent">
        <div className="row">
          {products && products.map(item => (
            <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-12" 
              key={item.id}
            >
              <div 
                className={`productCard ${item.is_enabled ? '' : 'disabled'}`}
                onClick={() => toDetail(item.id)}
              >
                {!item.is_enabled && (
                  <div className="soldOut">
                    <h5>售完</h5>
                  </div>
                )}
                <div className="top">
                  <img src={item.imageUrl} alt={item.title} />
                  {item.price && <div className="tag">特價中</div>}
                  {isLiked(item) && <i className="fas fa-heart liked" onClick={($event) => addTowish($event, item)}></i>}
                  {!isLiked(item) && <i className="fas fa-heart" onClick={($event) => addTowish($event, item)}></i>}
                </div>
                <div className="bottom">
                  <h3>{item.title}</h3>
                  <div>
                    <div className="price">NT{currency(item.origin_price)}</div>
                    <i className="fas fa-shopping-cart" onClick={($event) => addItem($event, item)}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}