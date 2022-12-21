import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../slices/userSlice';
import { useForm } from "react-hook-form";

import './home.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
  Redirect
} from "react-router-dom";

import Hero1 from './../../assets/images/thanos-pal-v_Cc1qxKuBsmin.jpg';
import Hero2 from './../../assets/images/duncan-kidd-uwFjCwhXMhE-compress.jpg';
import Hero3 from './../../assets/images/thanos-pal-8PWY6aTanhQ-unsplash.jpg';

import Series1 from '../../assets/images/nipanan-lifestyle-pV2xU2rP580-unsplash.jpg';
import Series2 from '../../assets/images/vera-cho-10SLUJj6G6w-unsplash.jpg';
import Series3 from '../../assets/images/dose-juice-j_YWoV_uzRw-unsplash.jpg';
import Series4 from '../../assets/images/kelly-sikkema-hUuGUG9gdRg-unsplash.jpg';

import HotSales1 from '../../assets/images/paul-gaudriault-QeIUZMA2mdU-unsplash.jpg';
import HotSales2 from '../../assets/images/paul-gaudriault-TVxI-vkmTLI-unsplash.jpg';

import backImg from '../../assets/images/draw-4067546_640.png';
import featureImg from '../../assets/images/sincerely-media-zLi4P7nnlsA-unsplash.jpg'

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submit = (data) => {
    console.log(data);
  } 

  return (
    <div className='home'>
      <header className="container-fluid px-0">
          <div className="carousel slide carousel-fade" data-ride="carousel" data-pause="false">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={Hero1} alt="純粹，從未改變的初衷，獻給渴望簡單的你" />
                <div className="slide-box"></div>
                <h2>純粹·Pure Savon</h2>
                <h3>從未改變的初衷，獻給渴望簡單的你</h3>
                <p>訂閱電子報，立刻享八折優惠</p>
                <Link to="/productlist">
                  <button type="button" className="carousel-btn">去逛逛</button>
                </Link>
              </div>
              <div className="carousel-item">
                <img src={Hero2} alt="天然，一口芳香氣息，致大地最原始的氣息" />
                <div className="slide-box"></div>
                <h2>天然·Pure Savon</h2>
                <h3>一口芳香氣息，致大地最原始的氣息</h3>
                <p>訂閱電子報，立刻享八折優惠</p>
                <Link to="/productlist">
                  <button type="button" className="carousel-btn">去逛逛</button>
                </Link>
              </div>
              <div className="carousel-item">
                <img src={Hero3} alt="獨特，與肌膚調和，只屬於你的專有香味" />
                <div className="slide-box"></div>
                <h2>獨特·Pure Savon</h2>
                <h3>與肌膚調和，只屬於你的專有香味</h3>
                <p>訂閱電子報，立刻享八折優惠</p>
                <Link to="/productlist">
                  <button type="button" className="carousel-btn">去逛逛</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="scrolldown">
            <a href="#series"><i className="fas fa-angle-double-down"></i></a>
          </div>
      </header>
      <section className="allseries" id="series">
        <div className="container-fluid px-0 mx-0">
          <div className="seriestop">
            <h3>全系列
              <span>All Series</span>
            </h3>
            <div className="row d-flex justify-content-center align-items-center series-group">
              <div className="col-12 col-md-6 p-0" onClick={() => history.push(`/productlist/草本系列`)}>
                <div className="seriesItem">
                  <img src={Series1} alt="草本系列" />
                  <p>草本系列</p>
                </div>
              </div>
              <div className="col-12 col-md-6 p-0" onClick={() => history.push(`/productlist/甜蜜系列`)}>
                <div className="seriesItem">
                  <img src={Series2} alt="甜蜜系列" />
                  <p>甜蜜系列</p>
                </div>
              </div>
              <div className="col-12 col-md-6 p-0" onClick={() => history.push(`/productlist/果香系列`)}>
                <div className="seriesItem">
                  <img src={Series3} alt="果香系列" />
                  <p>果香系列</p>
                </div>
              </div>
              <div className="col-12 col-md-6 p-0" onClick={() => history.push(`/productlist/經典系列`)}>
                <div className="seriesItem">
                  <img src={Series4} alt="經典系列" />
                  <p>經典系列</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container features">
        <div className="story row no-gutters">
          <div className="col-7">
            <div className="bg-cover features_img" style={{backgroundImage: `url(${featureImg})`}}></div>
          </div>
          <div className="col-5 feature_txt">
            <div className="feature_slogan">
              <h4 className="mb-4">支持永續環境</h4>
              <h4 className="mb-4">100%天然成分</h4>
              <h4>無香料及香精</h4>
            </div>
          </div>
        </div>
      </section>
      <section className="hotSales">
        <div className="containerfixed d-flex align-items-center justify-content-center flex-column">
          <div className="hotSalesTop mb-5">
            <h2>熱銷商品
              <span>TOP SALES</span>
            </h2>
          </div>
          <div className="sec d-flex" data-aos="fade-right" data-aos-delay="100" data-aos-once="true" data-aos-easing="ease-in">
            <div className="secImg"><img src={HotSales1} alt="研磨金盞花之皂" /></div>
            <div className="secContent">
              <h3>研磨金盞花之皂</h3>
              <p>有效舒緩頭痛及失眠，適用所有膚質，由傳統手工古法製成，100%有機環境保護，微生物可分解，純粹的天然植物油成。</p>
              <Link to="/productlist">
                <button type="button" className="carousel-btn">去逛逛</button>
              </Link>
            </div>
          </div>
          <div className="sec d-flex" data-aos="fade-left" data-aos-delay="100" data-aos-once="true" data-aos-easing="ease-in">
            <div className="secImg"><img src={HotSales2} alt="普羅旺斯草本之皂" /></div>
            <div className="secContent">
              <h3>普羅旺斯草本之皂</h3>
              <p>淡淡草本香氛且適用所有肌膚，溫和舒緩，由傳統手工古法製成，天然植物油成份，微生物可分解，100%有機環境保謢。</p>
              <Link to="/productlist">
                <button type="button" className="carousel-btn">去逛逛</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="consults">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="left col-md-6">
              <div className="backimg" style={{backgroundImage: `url(${backImg})`}}></div>
              <div className="consulttxt">
                <h3>聯絡我們<span>CONTACT US</span></h3>
                <p>如有任何問題或合作洽談，請留下訊息讓我們知道! 若是對商店有任何建議與回饋，也歡迎留言，讓我們能夠為您提供更好的購物體驗!</p>
              </div>
            </div>
            <div className="right col-md-6">
                <form className="contact" onSubmit={handleSubmit(submit)}>
                  <span className="bordercorner"></span>
                  <span className="bordercorner"></span>
                  <span className="bordercorner"></span>
                  <span className="bordercorner"></span>
                  <div className="form-group">
                    <div>
                      <input 
                        type="text"
                        name="name"
                        placeholder="您的姓名或稱呼"
                        {...register("name", { required: true })} />
                      {errors.name ?.type === 'required' && <p>請輸入姓名</p>}
                    </div>
                  </div>
                  <div className="form-group">
                    <div>
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="您的電子信箱"
                        {...register("email", { 
                          required: true, 
                          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: '請輸入 Email格式'
                          })} />
                        {errors.email ?.type === 'required' && <p>請輸入 Email</p>}
                    </div>
                  </div>
                  <div className="form-group">
                    <div >
                      <textarea 
                        name="message"
                        placeholder="想對我們說的話"
                        {...register("message", { required: true })}
                      ></textarea>
                      {errors.message ?.type === 'required' && <p>請輸入文字</p>}
                    </div>
                  </div>
                  <div className="formbtn">
                    <button className="btn" type="submit">提交</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="sendOverModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-light" id="exampleModalLabel">Pure Savon</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>訊息已送出，非常感謝您的聯繫! 我們收到訊息後，近期將會安排與您聯絡。</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="couponModal" tabIndex='-1' role='dialog' aria-hidden='true' data-backdrop='static'>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-light" id="exampleModalLabel">Pure Savon</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className='modalContent'>
              <p>2022週年慶！立即輸入Email，訂閱電子報，即可獲取購物優惠折扣碼喔！</p>
                <form>
                  <div className="form-group">
                    <div>
                      <input 
                        type="email"
                        name="c_email"
                        placeholder="您的電子信箱"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-secondary">訂閱</button>
                </form>
            </div>
            <div className="modalContent">
              <p>訂閱成功!! 結帳時，請別忘記輸入下方優惠代碼以取得折扣~!</p>
              <div className="coupon">
                <div className="backimg"></div>
                <h3>輸入優惠代碼：<strong>PURE2022</strong><br/>即享8折優惠</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}