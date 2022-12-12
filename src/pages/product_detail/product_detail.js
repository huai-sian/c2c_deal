import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProduct, renderSeriesList, updateWish, getWishLength, getWishFromLocal } from './../../slices/productsSlice';
import { addTocart, getCartLength, getCartTotal, pushToCart, removeCart, updateCart, getCartLocal } from './../../slices/cartSlice';
import Img from '../../assets/images/ajax-loader.gif';
import Loading from './../../components/loading';

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
    dispatch(getCartLocal());
    dispatch(getCartLength());
    dispatch(getCartTotal());
  }

  const addItem = (prod, qty) => {
    getCartInfo();
    dispatch(addTocart({ product: prod, qty}));
    getCartInfo();
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
          <h4 className='mb-4 h4'>使用方式</h4>
          <p className='mb-4'>
            將手工皂塗抹於沐浴球或沐浴巾，搓揉出泡沫後使用。
            手工皂直接塗抹於全身，並不會比使用沐浴巾(球)起泡力來的多，
            也會使手工肥皂快速消耗。 使用完畢後請將手工皂上的水分瀝乾，
            放入皂盤中使之乾燥，切勿讓皂盤內有積水，方可減低手工皂的溶化速度。
            置在陰涼通風處、避免潮濕處。
          </p>
          <h4 className='mb-4 h4'>注意事項</h4>
          <p className='mb-4'>
            手工皂上有部分一層白色物質，這是在皂化過程中，
            接觸到空氣時，所形成的皂粉。正常的現象請不用擔心，
            用水請洗過一次，白色的皂粉便會消失。 出現黃斑或臭油味可能酸敗，
            請勿使用!肌膚特別敏感出現不適，應立即停止使用!
          </p>
          <h4 className='mb-4 h4'>購買須知</h4>
          <div className="notice">
            <div className='return'>
                <h4 className='notice_title'><i className="fas fa-exclamation-triangle"></i>退換貨<i className="fas fa-exclamation-triangle"></i></h4>
                <p className='notice_txt'>退換貨處理期間，請留存發票並保持商品整體完整，若商品已拆封，
                或是因消費者對商品的不當處理及保存方式錯誤而造成商品損壞變質，則本公司將有保留退換貨的權利。</p>
            </div>
            <div className='aware'>
                <h4 className='notice_title'><i className="fas fa-exclamation-triangle"></i>退款方式<i className="fas fa-exclamation-triangle"></i></h4>
                <p className='notice_txt'>需提供您的匯款資料（存摺封面）E-mail 至客服中心，
                退款申請後預計7-10天(不含假日)退還至您指定的帳戶中。</p>
            </div>
            <div className='ship'>
                <h4 className='notice_title'><i className="fas fa-exclamation-triangle"></i>運送方式<i className="fas fa-exclamation-triangle"></i></h4>
                <p className='notice_txt'>於商店訂購不限金額免運。目前無法提供海外地區配送服務，不便之處，敬請見諒。</p>
            </div>
          </div>
        </div>
        <div className='related'>
          <h3>相關產品</h3>
          <hr />
          <div className="related_content row">
            {relatedProducts && relatedProducts.map(item => (
              <div className='col-md-4 col-sm-6 col-12 d-flex justify-content-start align-item-center' key={item.id}>
                <div className='productCard'>
                  <div className='top'>
                    <img src={item.imageUrl} alt={item.title} />
                    <div className='tag'>特價中</div>
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