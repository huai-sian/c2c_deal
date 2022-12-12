import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from './../../slices/adminOrdersSlice';

import './orders.scss';
import { useEffect } from 'react';

export default function Orders() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { orders } = useSelector((store) => store.adminOrders);

    useEffect(() => {
        dispatch(getOrders(''));
    }, [])


  return (
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
                        <button className="btn btn-open btn-sm">查看</button>
                    </td>
                </tr>
            ))}
            
        </tbody>
    </table>
  )
}