import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getProducts,
  getProduct,
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
  getCart
 } from './../../slices/cartSlice';
import Img from '../../assets/images/ajax-loader.gif';
import Loading from './../../components/loading';
import { useTranslation } from 'react-i18next';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import './product_detail.scss';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  
  const { products, product, relatedProducts, isLoading } = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(getProducts(''));
    dispatch(getProduct(id));
  }, []);

  const changeNum = (qty) => {
    const amount = quantity + qty;
    changeAmount(amount);
  }

  const changeAmount = (num) => {
    const qty = num;
    if (qty >= 10) {
      setQuantity(10);
    } else if (qty <= 1) {
      setQuantity(1);
    } else {
      setQuantity(qty);
    }
  }

  const getCartInfo = () => {
    // dispatch(getCartLocal());
    // dispatch(getCartLength());
    // dispatch(getCartTotal());
    dispatch(getCart());
  }

  const addItem = (prod, qty) => {
    dispatch(confirmCart({ product: prod, qty}));
  }

  if(isLoading) {
    return <Loading />
  }

  const currency = (num) => {
    const n = Number(num)
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
      return currency
    })}`
  }

  return (
    <div className='product_detail'>
      <div className="container">
        {product && (
          <div className='row product_info'>
            <div className='col-lg-6 col-md-7'>
              <div className='product_pic'>
                <img src={product.imageUrl} alt="title" />
              </div>
            </div>
            <div className='col-lg-6 col-md-5'>
              <ul className='product_meta'>
                <li>
                  <h3>{product.title}</h3>
                </li>
                <li>
                  {!product.price && <p className='origin_pricesolo'>NT {currency(product.origin_price)}</p>}
                  {product.price && <del className='origin_price'>NT {currency(product.origin_price)}</del>}
                </li>
                <li>
                  {product.price && <p className="salesprice">NT {currency(product.price)}</p>}
                </li>
                <li>
                  <div className='numControl'>
                    <button type="button" className=" btn-minus" onClick={() => changeNum(-1)}>
                    <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                    <input className="amount" value={quantity} type="number" max="10" min='1' onChange={(e) => changeNum(e.target.value)}/>
                    <button type="button" className=" btn-plus" onClick={() => changeNum(1)}>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                  <button className='btn btn-cart' onClick={(e) => addItem(product, quantity)}><i className='fas fa-shopping-cart'></i>加入購物車</button>
                </li>
                <li>
                  <p className='product_des'>{product.description}</p>
                </li>
                <li>
                  <p className='product_con'>{product.content}</p>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className='product_intro'>
          <h4 className='mb-4 h4'>{t('howtouse_title')}</h4>
          <p className='mb-4'>
            {t('howtouse')}
          </p>
          <h4 className='mb-4 h4'>{t('warning_title')}</h4>
          <p className='mb-4'>
            {t('warning')}
          </p>
          <h4 className='mb-4 h4'>{t('howtouse_title')}</h4>
          <div className="notice">
            <div className='return'>
                <h4 className='notice_title'><i className="fas fa-exclamation-triangle"></i>{t('noticesub1')}<i className="fas fa-exclamation-triangle"></i></h4>
                <p className='notice_txt'>{t('noticesub1_con')}</p>
            </div>
            <div className='aware'>
                <h4 className='notice_title'><i className="fas fa-exclamation-triangle"></i>{t('noticesub2')}<i className="fas fa-exclamation-triangle"></i></h4>
                <p className='notice_txt'>{t('noticesub2_con')}</p>
            </div>
            <div className='ship'>
                <h4 className='notice_title'><i className="fas fa-exclamation-triangle"></i>{t('noticesub3')}<i className="fas fa-exclamation-triangle"></i></h4>
                <p className='notice_txt'>{t('noticesub3_con')}</p>
            </div>
          </div>
        </div>
        <div className='related'>
          <h3>{t('related')}</h3>
          <hr />
          <div className="related_content row">
            {relatedProducts && relatedProducts.map(item => (
              <div className='col-md-4 col-sm-6 col-12 d-flex justify-content-start align-item-center' key={item.id}>
                <div className='productCard'>
                  <div className='top'>
                    <img src={item.imageUrl} alt={item.title} />
                    <div className='tag'>{t('onsale')}</div>
                  </div>
                  <div className='bottom'>
                    <h3>{item.title}</h3>
                    <div className='price'>NT$ {item.origin_price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}