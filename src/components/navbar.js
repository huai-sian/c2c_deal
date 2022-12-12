import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, renderSeriesList, updateWish, getWishLength, getWishFromLocal, deleteWish } from './../slices/productsSlice';
import { addTocart, getCartLength, getCartTotal, pushToCart, removeCart, updateCart, getCartLocal } from './../slices/cartSlice';
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
  Redirect
} from "react-router-dom";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [wishOpen, setWishOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const dispatch = useDispatch()

  const { products, allSeries, wish, wishLength } = useSelector((store) => store.products)
  const { cart, cartlength, total } = useSelector((store) => store.cart)

  useEffect(() => {
    dispatch(getWishFromLocal())
    dispatch(getWishLength())
    dispatch(getCartLocal());
    dispatch(getCartLength());
    dispatch(getCartTotal());
  }, [])

  const remove = (id) => {
    dispatch(removeCart(id));
    dispatch(updateCart());
  }

  const removeWish = (item) => {
    dispatch(deleteWish(item));
    dispatch(getWishFromLocal());
    dispatch(getWishLength());
  }

  const handleWishOpen = () => {
    setWishOpen(prev => {
      return !prev
    })
  }

  const handleCartOpen = () => {
    setCartOpen(prev => {
      return !prev
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-total fixed-top">
      <div className="container-fluid">
        <nav className="navbar">
          <Link to="/">
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
              className="btn-heart"
              id="wishList"
              onClick={() => handleWishOpen()}>
              <i className="fas fa-heart"></i>
              <span className="badge">{wishLength}</span>
            </button>
            {wishOpen && (
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-width p-2">
                {wishLength > 0 && <h4 className="mb-2">{t('wishlist')}</h4>}
                {wishLength == 0 && <h4 className="mb-2">{t('wish_notice')}</h4>}
                <table className="table-cart table">
                  <tbody>
                    {wish && wish.map((item, i) => (
                      <tr className="pb-0" key={item.id}>
                        <td width="10%"><i className="fas fa-shopping-cart"></i></td>
                        <td><div><img className="img-fluid" src={item.imageUrl}/></div></td>
                        <td width="50%" className="wish_title">{item.title}</td>
                        <td width="10%"><span className="close" onClick={() => removeWish(item)}>X</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="dropdown ml-md-5">
            <button 
              type="button"
              className="btn-cart"
              id="cartList"
              onClick={() => handleCartOpen()}>
              <i className="fas fa-shopping-cart"></i><span className="badge">{cartlength}</span>
            </button>
            {cartOpen && (
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-width p-2">
              <h4 className="mb-2">購物車</h4>
              {cartlength == 0 && <h4 className="mb-2">想買的東西放這吧！</h4>}
                <table className="table-cart table">
                  <tbody>
                    {cart && cart.map((item, i) => (
                      <tr className='pb-0' key={item.id}>
                        <td><div><img 
                          className="img-fluid"
                          src={item.imageUrl}
                          alt={item.title}
                          style={{width: '3rem'}} /></div></td>
                        <td className='wish_title'>{item.title}</td>
                        <td>x{item.qty}</td>
                        <td>{item.origin_price}</td>
                        <td><span className='close' onClick={() => remove(item.id)}>X</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="totalinfo">
                  <div className="px-4">小計</div>
                  <div className="totalnum">{total}</div>
                  <div className="btn btn-goCart">
                    <Link to="/productlist">
                      {t('gotoshop')}
                    </Link>
                  </div>
                  <div className="btn btn-goCart">
                    <Link to="/checkorders">
                      結帳去
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
