import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, addCoupon, editCoupon, deleteCoupon } from './../../slices/adminCouponsSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loading from './../../components/loading';
import './coupons.scss';
import { useEffect } from 'react';

export default function Coupons() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { coupons, isLoading } = useSelector((store) => store.adminCoupons);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [due_date, setDue_Date] = useState('');
  const [percent, setPercent] = useState('');
  const [is_enabled, setIs_Enabled] = useState(false);
  const [data, setData] = useState({
      title: '',
      code: '',
      due_date: '',
      percent: '',
      is_enabled: false,
  });
  const [show, setShow] = useState(false);

    const handleToggle = (bool) => {
        setShow(bool);
    }

    const passData = (data) => {
        setData(data);
    }

    const handleSubmit = (data) => {
        dispatch(editCoupon(data));
    }

    const handleAdd = (data) => {
        dispatch(addCoupon(data));
    }

    const newCoupon = () => {
        setData({
            title: '',
            code: '',
            due_date: '',
            percent: '',
            is_enabled: '',
        });
    }

    const boolCheck = (num) => {
        if(num == 1) {
            return true
        } else {
            return false
        }
    }

    const handleBool = (bool) => {
        if(bool) {
            return 1
        } else {
            return 0
        }
    }

    const removeCoupon = (data) => {
        dispatch(deleteCoupon(data));
    }

    useEffect(() => {
        dispatch(getCoupons(''));
    }, [])

    if(isLoading) {
      return <Loading />
    }

  return (
    <>
        <button className="btn btn-primary mb-3" onClick={() => { handleToggle(true); newCoupon(); }}>新增優惠券</button>
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th width="150">折扣百分比</th>
                    <th width="140">到期日</th>
                    <th width="120">是否啟用</th>
                    <th width="140">編輯</th>
                </tr>
            </thead>
            <tbody>
                {coupons && coupons.map(item => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.percent}%</td>
                        <td>{item.due_date}</td>
                        <td>
                            {item.is_enabled == true ? <span className="text-success">啟用</span> : <span>未啟用</span>}
                        </td>
                        <td>
                            <button className="btn btn-open btn-sm" onClick={() => { passData(item); handleToggle(true);}}>查看</button>
                            <button className="btn btn-delete btn-sm btn-danger" onClick={() => removeCoupon(item)}>刪除</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>新增 / 修改優惠券</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="title">標題</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        onChange={(e) => setData((prev) => (
                            { ...prev, title: e.target.value }
                        ))}
                        value={data.title ? data.title : ''}
                        placeholder="請輸入標題" />
                </div>
                <div className="form-group">
                    <label htmlFor="code">優惠碼</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="code"
                        onChange={(e) => setData((prev) => (
                            { ...prev, code: e.target.value }
                        ))}
                        value={data.code ? data.code : ''}
                        placeholder="請輸入優惠碼編號" />
                </div>
                <div className="form-group">
                    <label htmlFor="due_date">到期日</label>
                    <input
                        type="date"
                        className="form-control"
                        id="due_date"
                        onChange={(e) => setData((prev) => (
                            { ...prev, due_date: e.target.value }
                        ))}
                        value={data.due_date ? data.due_date : ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="percent">折扣百分比</label>
                    <input 
                        type="number"
                        className="form-control"
                        id="percent"
                        onChange={(e) => setData((prev) => (
                            { ...prev, percent: e.target.value }
                        ))}
                        value={data.percent ? data.percent : ''}
                        placeholder="請輸入折扣百分比" />
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input 
                            className="form-check-input" type="checkbox"
                            onChange={(e) => {setData((prev) => (
                                { ...prev, is_enabled: handleBool(e.target.checked) }
                                ))
                            }
                            }
                            id="is_enabled"
                            defaultChecked={data.is_enabled? boolCheck(data.is_enabled) : false}
                            />
                        <label className="form-check-label" htmlFor="is_enabled">
                        是否啟用
                        </label>
                    </div>
                </div>
            
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleToggle(false)}>
                    關閉
                </Button>
                <Button 
                    variant="primary"
                    onClick={() => {
                        data.id ? handleSubmit(data) : handleAdd(data); 
                        handleToggle(false);
                    }}
                >
                    完成
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}