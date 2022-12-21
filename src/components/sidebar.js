import {
  Link
} from "react-router-dom";

export default function Sidebar() {
  return(
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理人</span>
          <a className="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
            <i className="fas fa-box-open"></i>
              產品列表
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/orders">
            <i className="fas fa-list-ul"></i>
              訂單列表
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/coupons">
            <i className="fas fa-ticket-alt"></i>
              優惠卷
            </Link>
          </li>
          
        </ul>

        {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>模擬功能</span>
        <a className="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
        </a>
        </h6>
        <ul className="nav flex-column mb-2">
        <li className="nav-item">
          <Link className="nav-link" to="/back/customer_orders">
          <i className="fas fa-shopping-cart"></i>
            模擬訂單
          </Link>
        </li>
        </ul> */}
      </div>
    </nav>
  )
}

    
