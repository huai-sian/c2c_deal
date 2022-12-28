import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, renderSeriesList, updateWish, getWishLength, getWishFromLocal } from './../../slices/productsSlice';
import { addTocart,
        getCartLength,
        getCartTotal,
        pushToCart,
        removeCart,
        updateCart,
        getCartLocal,
        getCart,
        deleteCart,
        createOrder,
        updateOrderCreated,
        updateIsDeleted,
        updateCouponSuccess,
        addCouponCode,
      } from './../../slices/cartSlice';

import {
        BrowserRouter as Router,
        Switch,
        Route,
        Link,
        useParams,
        useHistory,
        Redirect
      } from "react-router-dom";

import { updateLoading } from './../../slices/orderSlice';
import Img from '../../assets/images/vera-cho-10SLUJj6G6w-unsplash.jpg';
import { useForm } from "react-hook-form";

import './billingInfo.scss';

export default function BillingInfo() {
  const [couponNum, setCouponNum] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { cart, cartApi, cartlength, total, orderId, isDeleted, orderCreated } = useSelector((store) => store.cart)

  const submit = (data) => {
    console.log(data);
    dispatch(createOrder({ user: data }));
  }

  useEffect(() => {
    dispatch(getCart());
    if(cartlength == 0) {
      history.push(`/productlist`);
    }
  }, []);

  useEffect(() => {
    if(orderCreated) {
      history.push(`/checkout/${orderId}`);
      dispatch(updateOrderCreated(false));
    }
  }, [orderCreated])

  const currency = (num) => {
    const n = Number(num)
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
      return currency
    })}`
  }

  const deleteCartAll = () => {
    dispatch(getCart());
    cartApi.carts.forEach((item, i) => {
      dispatch(deleteCart(item));
    })
  }

  const submitCouponNum = (couponNum) => {
    dispatch(addCouponCode(couponNum));
    dispatch(updateCouponSuccess(false));
  }


  return (
    <div className="billinginfo">
      <div className="container_fix">
        <h3>收件人資訊</h3>
        <div className='row mb-4'>
          <div className="col-12 col-md-5">
            <ul className='order'>
              {/* carts.carts */}
              {cartApi.carts && cartApi.carts.map((item, i) => (
                <li className="pb-3 orderList" key={item.id}>
                  <div className='row'>
                    <div className='col-3 p-0'>
                      <div className='pro-img'>
                        <img src={item.product.imageUrl} alt="" />
                      </div>
                    </div>
                    <div className='col-7 p-0'>
                        <div className='row m-0 w-100'>
                            <div className='col-12 col-md-8'>
                                <div className='pro-name'>{item.product.title}</div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='pro_qty'>x{item.qty}</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2 p-0'>
                      <div className="pro_price">NT{item.product.origin_price}</div>
                      <div className="pro_price">NT{item.product.price}</div>
                    </div>
                  </div>
                </li>
              ))}
                <li className='pt-4'>
                    <div className='row summary'>
                        <div className='col-6 p-0'>共{cartlength}項</div>
                        <div className='col-2 p-0'>總計</div>
                        <div className='col-3 p-0'>NT{currency(cartApi.total)}</div>
                        <div className='col-1 p-0'></div>
                    </div>
                </li>
            </ul>
            <div className='my-4 coupon'>
                <div className='input-group'>
                    <input
                      type="text"
                      className='form-control'
                      placeholder="請輸入優惠代碼"
                      onChange={(e) => setCouponNum(e.target.value)}
                    />
                    <div className='input-group-append'>
                      <span className='input-group-text coupon-send' onClick={() => submitCouponNum(couponNum)}>確認</span>
                    </div>
                </div>
            </div>
          </div>
          <div className="col-12 col-md-7">
            <form className='buyer_infos' onSubmit={handleSubmit(submit)}>
              <div className='form-row'>
                  <div className='form-group col-sm-6'>
                    <label htmlFor="buyer-name">
                      收件人姓名<span className='marker'>*</span>
                    </label>
                    <input 
                      type="text" 
                      id="buyer-name" 
                      className='form-control'
                      {...register("name", { required: true })}
                      placeholder="請輸入姓名" />
                    {errors.name ?.type === 'required' && <p>請輸入姓名</p>}
                  </div>
                  <div className='form-group col-sm-6'>
                    <label htmlFor="buyer-tel">
                      收件人手機號碼<span className='marker'>*</span>
                    </label>
                    <input 
                      type="text" 
                      id="buyer-tel" 
                      className='form-control' 
                      placeholder="請輸入手機號碼" 
                      {...register("tel", { 
                        required: true,
                        pattern: /^09[0-9]{8}$/,
                        message: '請輸入手機號碼格式'
                        })} />
                    {errors.tel ?.type === 'required' && <p>請輸入電話號碼</p>}
                  </div>
              </div>
              <div className='form-row'>
                  <div className='form-group col-sm-6'>
                  <label htmlFor="buyer-email">Email<span className='marker'>*</span>
                  </label>
                  <input type="email" className="form-control" name="email" id="buyer-email"
                      placeholder="請輸入 Email" {...register("email", { 
                        required: true, 
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: '請輸入 Email格式'
                        })} />
                    {errors.email ?.type === 'required' && <p>請輸入 Email</p>}
                  </div>
                  <div className='form-group col-sm-6'>
                      <div>
                          <label htmlFor="buyer-pay">付款方式</label>
                          <select name="payment" id="buyer-pay" className='form-control' {...register("payment", { required: true })}>
                              <option value="CVS">信用卡付款</option>
                              <option value="CTP">ATM轉帳付款</option>
                          </select>
                      </div>
                  </div>
              </div>
            
                <div className="form-group">
                <label htmlFor="buyeraddress">收件人地址<span className='marker'>*</span>
                </label>
                <input type="text" className="form-control" name="address" id="buyeraddress" placeholder="請輸入地址" {...register("address", { required: true })} />
                {errors.address ?.type === 'required' && <p>請輸入收件人地址</p>}
              </div>
              <div className='form-group'>
                <label htmlFor="comment">備註</label>
                <textarea name="" id="comment" className="form-control" cols="10" rows="3" placeholder="歡迎輸入想對我們說的話"></textarea>
              </div>
              <div className='sub_order'>
                <button onClick={() => deleteCartAll()} className='btn-order'>清除購物車</button>
                <button className='btn-order' type='submit'>下一步</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}