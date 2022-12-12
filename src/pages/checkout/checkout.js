import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, completePay } from './../../slices/orderSlice';
import Visa from '../../assets/images/visa.svg';
import MasterCard from '../../assets/images/mastercard.svg';
import Jcb from '../../assets/images/jcb.svg';
import { useForm } from "react-hook-form";
import Loading from './../../components/loading';

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

import './checkout.scss';

export default function Checkout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { order, isPaid, isLoading } = useSelector((store) => store.order);

  useEffect(() => {
    console.log(id);
    console.log(isLoading);
    dispatch(getOrder(id));
  }, []);

  const dateFilter = (time) => {
    const date = new Date(time * 1000)
    return date.toLocaleDateString()
  }

  const submit = (data) => {
    console.log('submit');
    console.log(data);
    dispatch(completePay(id));
  }

  const toProductList = () => {
      history.push('/productlist');
  }

  useEffect(() => {
    if(isPaid) {
        dispatch(getOrder(id));
    }
  }, [isPaid]);



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
    <div className='checkOut'>
      <div className="container">
        <h3>訂單資訊</h3>
            <div className="row listRow">
                <div className={`col-md-6 col-12 ${order.is_paid? 'typo__center': ''}`} >
                    <ul className='order'>
                        <p>訂購日期 - {dateFilter(order.create_at)}</p>
                        <p>訂單編號 - <span className="orderid">{id}</span></p>
                        {order.products && Object.values(order.products).map(item => (
                            <li className="orderList" key={item.id}>
                                <div className="row">
                                    <div className="col-6 p-0">
                                        <div className="pro-title">
                                            {item.product.title}
                                        </div>
                                        </div>
                                    <div className="col-2 p-0">
                                        <div className="pro-qty">{item.qty}</div>
                                    </div>
                                    <div className="col-4 p-0">
                                        <div className='pro-price'>NT{(Number(item.final)) / (Number(item.qty))}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                        
                        <li className='pt-2 summaryBlock'>
                            <div className='row summaryList'>
                                <div className='col-8 p-0 summary'>總計</div>
                                <div className='col-4 p-0 summary'>{currency(order.total)}</div>
                            </div>
                        </li>
                    </ul>
                    <div className='order_info'>
                        <table className='table'>
                            {order.user && (
                                <tbody>
                                    <tr>
                                        <td className="title">姓名</td>
                                        <td>{order.user.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">電話號碼</td>
                                        <td>{order.user.tel}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">Email</td>
                                        <td>{order.user.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">地址</td>
                                        <td>{order.user.address}</td>
                                    </tr>
                                    <tr>
                                        <td className="title">付款方式</td>
                                        {order.user.payment == 'CVS'? <td>信用卡付款</td> : <td>ATM轉帳付款</td>}
                                    </tr>
                                    <tr>
                                        <td className="title">付款狀態</td>
                                        {order.is_paid ? <td className='complete'>付款完成</td> : <td className='incomplete'>未付款</td>}
                                    </tr>
                                </tbody>
                            )}
                            
                        </table>
                        <div className='endpay'>
                            <button onClick={toProductList}>回到商店</button>
                        </div>
                    </div>
                </div>
                {!order.is_paid && (
                    <div className="col-md-6 col-12" v-if="!order.is_paid">
                        <div className="order_info">
                        <h3 className="h3">信用卡資訊</h3>
                        <div className="d-flex card_support">
                            <p>支援使用卡種類</p>
                            <span className="d-flex">
                            <div className="imagefr"><img src={Visa} alt="Visa" /></div>
                            <div className="imagefr"><img src={MasterCard} alt="MasterCard" /></div>
                            <div className="imagefr"><img src={Jcb} alt="JCB" /></div>
                            </span>
                        </div>
                        <form onSubmit={handleSubmit(submit)} className="form_card">
                            <div className="form-group">
                            <label htmlFor="card_number">信用卡號<span className='marker'>*</span>
                            </label>
                            <input
                                type="text" 
                                className="form-control"
                                name="card_number"
                                id="card_number"
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                {...register('cardNum', {
                                    required: true,
                                    pattern: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
                                    massage: '請輸入正確卡號格式'
                                })}
                            />
                            {errors.cardNum ?.type === 'required' && <p>請輸入信用卡卡號</p>}
                            </div>
                            <div className="form-group">
                            <label htmlFor="card_owner">持卡人英文姓名<span className='marker'>*</span>
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="card_owner"
                                id="card_owner"
                                placeholder="請輸入英文姓名"
                                {...register('cardOwner', {
                                    required: true,
                                })}
                            />
                            {errors.cardOwner ?.type === 'required' && <p>請輸入持卡人英文姓名</p>}
                            </div>
                            <div className="form-group">
                            <label htmlFor="expired">
                                有效年月
                                <span className='marker'>*</span>
                            </label>
                            <input 
                                type="text" 
                                name="expired"
                                id="expired"
                                maxLength='5'
                                placeholder="MM/YY"
                                className="form-control"
                                {...register('expired', {
                                    validate: value => {
                                    const MMYY = value.split('/');
                                    const inputMon = MMYY[0];
                                    const inputYear = MMYY[1];
                                    const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
                                    const now = new Date();
                                    const nowYear = now.getFullYear().toString();
                                    if(months.indexOf(inputMon) < 0) {
                                        return '請輸入正確日期'
                                    } else if(inputYear < nowYear.substring(2,4)) {
                                        return '請輸入正確日期';
                                    } else {
                                        return true;
                                    }
                                    }
                                })}
                            />
                            </div>
                            <div className="form-group">
                                <label htmlFor="verifyNum">
                                驗證碼(卡背三位數)
                                <span className='marker'>*</span>
                                </label>
                                <input 
                                type="text"
                                maxLength="3"
                                className="form-control"
                                name="verifyNum"
                                id="verifyNum"
                                {...register('verifyNum', {
                                    required: true
                                })}
                                />
                                {errors.verifyNum ?.type === 'required' && <p>請輸入驗證碼</p>}
                            </div>
                            <div className="endpay">
                                <button type="submit">確認付款</button>
                            </div>
                        </form>
                        </div>
                    </div>
                )}
            </div>
      </div>
    </div>
  )
}