import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getOrders } from './../../slices/adminOrdersSlice';
import Loading from './../../components/loading';
import Pagination from './../../components/pagination';
import './orders.scss';
import { useEffect } from 'react';

export default function Orders() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { orders, isLoading, pagination } = useSelector((store) => store.adminOrders);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [fileUploading, setFileUploading] = useState('');
  const [nowPage, setNowPage] = useState(1);

  const handleToggle = (bool) => {
    setShow(bool);
  };

  const passData = (data) => {
    setData(data);
  }

  useEffect(() => {
    dispatch(getOrders(nowPage));
  }, [])

  useEffect(() => {
    dispatch(getOrders(nowPage));
  }, [nowPage])

  if(isLoading) {
    return <Loading />
  }

  return (
    <>
        <table className="table mt-4">
            <thead>
                <tr>
                    <th width="130">購買時間</th>
                    <th>姓名</th>
                    <th>購買款項</th>
                    <th width="120">應付金額</th>
                    <th width="120">是否付款</th>
                    <th width="130">詳細資訊</th>
                </tr>
            </thead>
            <tbody>
                {orders && orders.map(item => (
                    <tr key={item.id}>
                        <td>{item.create_at}</td>
                        <td>{item.user.name}</td>
                        <td>
                            <ul>
                                {Object.values(item.products).map(prod => (
                                    <li key={prod.id}>
                                        {prod.product.title}
                                        數量：{ prod.qty }{ prod.product.unit }
                                    </li>
                                ))
                                }
                            </ul>
                        </td>
                        <td>{item.total}</td>
                        <td>
                            {item.is_paid == true ? <span className="ispaid">已付款</span> : <span className="unpaid">未付款</span>}
                        </td>
                        <td>
                            <button className="btn btn-open btn-sm" onClick={() => {passData(item); handleToggle(true);}}>查看</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {orders && <Pagination pagination={pagination} setNowPage={setNowPage} nowPage={nowPage}></Pagination>}
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>訂單資訊</Modal.Title>
            </Modal.Header>
            {data.create_at && 
            <Modal.Body>
                <div className='my-2'>訂購人姓名：{data.user.name}</div>
                <div className='my-2'>訂單編號：{data.id}</div>
                <div className='my-2'>訂購日期：{data.create_at}</div>
                {data.is_paid ? <div className='my-2'>付款狀態：已付款</div> : <div className='my-2'>付款狀態：未付款</div>}
                <div className='my-2'>Email：{data.user.email}</div>
                <div className='my-2'>收件地址：{data.user.address}</div>
                <table className="table mt-4">
                <thead>
                    <tr>
                        <th width="130">品項</th>
                        <th width="80">數量</th>
                        <th width="100">單價</th>
                        <th width="110">小計</th>
                        <th width="110">優惠</th>
                        <th width="110">總計</th>
                    </tr>
                </thead>
                <tbody>
                    {data.products && Object.values(data.products).map((item) => (
                        <tr key={item.id}>
                            <td>{item.product.title}</td>
                            <td>{item.qty}</td>
                            <td>NT{item.product.price}</td>
                            <td>NT{item.total}</td>
                            {item.hasOwnProperty('coupon') ? <td>{item.coupon.percent}%</td> : <td>未使用</td>}
                        </tr>
                    ))}
                    <tr>
                        <td colSpan='5'>應付金額</td>
                        <td>NT{data.total}</td>
                    </tr>
                </tbody>
                </table>
            </Modal.Body>}
            
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleToggle(false)}>
                關閉
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}