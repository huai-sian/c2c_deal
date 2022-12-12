import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons } from './../../slices/adminCouponsSlice';

import './coupons.scss';
import { useEffect } from 'react';

export default function Coupons() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { coupons } = useSelector((store) => store.adminCoupons);

    useEffect(() => {
        dispatch(getCoupons(''));
    }, [])


  return (
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
                        <button className="btn btn-open btn-sm">查看</button>
                    </td>
                </tr>
            ))}
            
        </tbody>
    </table>
  )
}