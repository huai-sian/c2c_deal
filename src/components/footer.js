import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  Link
} from "react-router-dom";
import i18n from '../i18n/lang';
import { useTranslation } from 'react-i18next';

import './footer.scss';


export default function Footer() {
  const { t, i18n } = useTranslation();
  return(
    <footer>
      <div className='container-fixed text-center'>
          <Row className='d-flex aiCenter jcCenter'>
              <Col className="contacts">
                <span className="tel">TEL:(02)2495-0933<br />service@puresavon.com.tw</span>
              </Col>
              <Col className="socials">
                  <h6>PURE & SIMPLE</h6>
                  <a href="#" className='socialLink apart'>LINE</a>
                  <a href="#" className='socialLink apart'>FACEBOOK</a>
                  <a href="#" className='socialLink'>INSTAGRAM</a>
              </Col>
              <Col className="language">語言：
                <div className='lang_select'>
                  <span onClick={() => i18n.changeLanguage('zh')}>繁體中文</span>
                </div>
                <span> | </span>
                <div className="lang_select">
                  <span onClick={() => i18n.changeLanguage('en')}>English</span>
                </div>
                <Link to="/login"  className="nav-link mt-3">
                  <span>管理員登入</span>
                </Link>
              </Col>
          </Row>
          <span className='copyRight'>&#169;僅個人作品練習無商業用途</span>
      </div>
    </footer>
  )
}