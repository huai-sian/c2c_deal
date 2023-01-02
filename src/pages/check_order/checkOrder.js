import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getProducts,
  renderSeriesList,
  updateWish,
  getWishLength,
  getWishFromLocal
 } from './../../slices/productsSlice';
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
  updateCartConfirmed } from './../../slices/cartSlice';

import Img from '../../assets/images/vera-cho-10SLUJj6G6w-unsplash.jpg';
import { useTranslation } from 'react-i18next';
import CheckItem from './../../components/checkItem.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import './checkOrder.scss';

export default function CheckOrder() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { cartApi, cartlength, total, cartConfirmed } = useSelector((store) => store.cart)
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    dispatch(getCart());
    setQuantity();
    if(cartlength == 0) {
      history.push('/productlist');
    }
  }, []);

  useEffect(() => {
    if(cartlength == 0) {
      history.push('/productlist');
    }
  }, [cartlength]);


  const getCartInfo = () => {
    dispatch(getCart());
  }

  const handleConfirmCart = () => {
    console.log('check');
    history.push('/billingInfo');
  }

  const currency = (num) => {
    const n = Number(num)
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
      return currency
    })}`
  }

  return (
    <div className='container orders_check'>
        <h3>{t('step1_title')}</h3>
        <ul className='order'>
            {cartApi.carts && cartApi.carts.map(item => (
              <CheckItem data={item} key={item.id}></CheckItem>
            ))}
            
            <li className='pt-4'>
                <div className='row summary'>
                    <div className='col-7 p-0'>{t('checkorder_inTotal')} {cartlength} {t('checkorder_itemCh')}</div>
                    <div className='col-1 p-0'>{t('summary')}</div>
                    <div className='col-2 p-0'>NT {currency(total)}</div>
                    <div className='col-2 p-0'></div>
                </div>
            </li>
        </ul>
        <div className='gocheck'>
          {/* <button type="button" className="btn-back">繼續購物</button>
          <button type="button" className="btn-check">填寫資料</button> */}
          <button type="button" className="btn-check btn_confirmcart" onClick={() => handleConfirmCart()}>{t('checkorder_next_btn')}</button>
        </div>
        <div className="declare">
            <div className='declare_left'>{t('checkorder_warning_title')}</div>
            <h5><i className="fas fa-exclamation-circle"></i>{t('checkorder_notice_title')}</h5>
            <ul>
                <li>{t('checkorder_notice1')}</li>
                <li>{t('checkorder_notice2')}</li>
                <li>{t('checkorder_notice3')}</li>
                <li>{t('checkorder_notice4')}</li>
                <li>{t('checkorder_notice5')}</li>
                <li>{t('checkorder_notice6')}</li>
            </ul>
        </div>
    </div>
  )
}