import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getProducts,
  renderSeriesList, 
  updateWish,
  getWishLength,
  getWishFromLocal,
  getCurrentSeries,
  deleteWish
} from './../slices/productsSlice';
import {
  addTocart,
  getCartLength,
  getCartTotal,
  pushToCart,
  removeCart,
  updateCart,
  getCartLocal,
  confirmCart,
  getCart,
  deleteCart
 } from './../slices/cartSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

import "./navbar.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
  useHistory
} from "react-router-dom";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch()

  const { products, allSeries, wish, wishLength } = useSelector((store) => store.products)
  const { cart, cartApi, cartlength, total } = useSelector((store) => store.cart)

  useEffect(() => {
    dispatch(getWishFromLocal())
    dispatch(getWishLength())
    dispatch(getCart());
    console.log(cartApi);
  }, [])

  const remove = (item) => {
    dispatch(deleteCart(item));
    getCartInfo();
  }

  const getCartInfo = () => {
    dispatch(getCart());
  }

  const removeWish = (item) => {
    dispatch(deleteWish(item));
    dispatch(getWishFromLocal());
    dispatch(getWishLength());
  }


  const addItem = (e, item, qty = 1) => {
    e.stopPropagation();
    dispatch(confirmCart({ product: item, qty}));
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-total fixed-top">
      <div className="container-fluid">
        <nav className="navbar">
          <Link to="/"  className="nav-link">
            <span className="nav-title"><i className="fas fa-praying-hands"></i>Pure Savon</span>
          </Link>
        </nav>
        <div className="d-flex justify-content-end navContent">
          <div className="dropdown">
            <Link to="/productlist">
              <button type="button" className="btn-store" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span><i className="fas fa-store"></i><span className="d-none d-md-inline-block">{t('gotoshop')}</span></span>
              </button>
            </Link>
          </div>
          <div className="dropdown ml-md-5 ml-1">
            <button
              type="button"
              className="btn-heart dropdown-toggle"
              id="wishList"
              type="button" data-bs-toggle="dropdown" aria-expanded="false"
            >
              <i className="fas fa-heart"></i>
              <span className="badge">{wishLength}</span>
            </button>
            
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-width p-2">
              {wishLength > 0 && <h4 className="mb-2">{t('wishlist')}</h4>}
              {wishLength == 0 && <h4 className="mb-2">{t('wish_notice')}</h4>}
              <table className="table-cart table">
                <tbody>
                  {wish && wish.map((item, i) => (
                    <tr className="pb-0" key={item.id}>
                      <td width="10%"><i className="fas fa-shopping-cart" onClick={($event) => addItem($event, item)}></i></td>
                      <td><div><img className="img-fluid" src={item.imageUrl}/></div></td>
                      <td width="50%" className="wish_title" onClick={() => history.push(`/product_detail/${item.id}`)}>{item.title}</td>
                      <td width="10%"><span className="close" onClick={() => removeWish(item)}>X</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
          </div>
          <div className="dropdown ml-md-5">
            <button
              type="button"
              className="btn-cart dropdown-toggle"
              id="cartList"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-shopping-cart"></i><span className="badge">{cartlength}</span>
            </button>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-width p-2">
                <h4 className="mb-2">{t('cart')}</h4>
              {cartlength == 0 && <h4 className="mb-2">{t('wish_notice')}</h4>}
                <table className="table-cart table">
                  <tbody>
                    {cartApi.carts && cartApi.carts.map((item, i) => (
                      <tr className='pb-0' key={item.id}>
                        <td><div><img 
                          className="img-fluid"
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          style={{width: '3rem'}} /></div></td>
                        <td className='wish_title'>{item.product.title}</td>
                        <td>x{item.qty}</td>
                        <td>{item.total}</td>
                        <td><span className='close' onClick={() => remove(item)}>X</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="totalinfo">
                  <div className="px-4">{t('total')}</div>
                  <div className="totalnum">{total}</div>
                  <div className="btn btn-goCart">
                    <Link to="/productlist">
                      {t('gotoshop')}
                    </Link>
                  </div>
                  <div className="btn btn-goCart">
                    <Link to="/checkorders">
                      {t('gocheck')}
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
