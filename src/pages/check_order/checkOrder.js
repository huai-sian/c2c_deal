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
        <h3>購買清單確認</h3>
        <ul className='order'>
            {cartApi.carts && cartApi.carts.map(item => (
              <CheckItem data={item} key={item.id}></CheckItem>
            ))}
            
            <li className='pt-4'>
                <div className='row summary'>
                    <div className='col-7 p-0'>共 {cartlength} 項</div>
                    <div className='col-1 p-0'>總計</div>
                    <div className='col-2 p-0'>NT {currency(total)}</div>
                    <div className='col-2 p-0'></div>
                </div>
            </li>
        </ul>
        <div className='gocheck'>
          {/* <button type="button" className="btn-back">繼續購物</button>
          <button type="button" className="btn-check">填寫資料</button> */}
          <button type="button" className="btn-check btn_confirmcart" onClick={() => handleConfirmCart()}>確認購買</button>
        </div>
        <div className="declare">
            <div className='declare_left'>注意事項</div>
            <h5><i className="fas fa-exclamation-circle"></i>訂購須知</h5>
            <ul>
                <li>請確認所填寫的資料是否正確，下單後未提供修改付款方式服務。</li>
                <li>因拍攝略有色差，圖片僅供參考，顏色請以實際收到商品為準。</li>
                <li>本店商品目前只供應台灣地區，只提供宅配到府。</li>
                <li>目前支援貨到付款、超商付款。</li>
                <li>本店商品為統一會於付款後7個工作日內出貨(不含假日)。</li>
                <li>辦理退換貨時，商品必須是全新狀態與完整包裝，退回之商品必須於7日鑑賞期內寄回。</li>
            </ul>
        </div>
    </div>
  )
}