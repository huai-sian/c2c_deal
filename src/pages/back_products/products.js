import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './../../slices/adminProductsSlice';

import './products.scss';
import { useEffect } from 'react';

export default function Products() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { products } = useSelector((store) => store.adminProducts);

    useEffect(() => {
        dispatch(getProducts(''));
    }, [])


  return (
    <table className="table mt-4">
        <thead>
            <tr>
                <th width="110">分類</th>
                <th>產品名稱</th>
                <th width="130">原價</th>
                <th width="130">售價</th>
                <th width="130">是否啟用</th>
                <th width="140">編輯</th>
            </tr>
        </thead>
        <tbody>
            {products && products.map(item => (
                <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>{item.title}</td>
                    <td>{item.origin_price}</td>
                    <td>{item.price}</td>
                    <td>
                        {item.is_enabled == true ? <span className="text-success">啟用</span> : <span>未啟用</span>}
                    </td>
                    <td>
                        <button className="btn btn-open btn-sm">編輯</button>
                        <button className="btn btn-delete btn-sm">刪除</button>
                    </td>
                </tr>
            ))}
            
        </tbody>
    </table>
  )
}