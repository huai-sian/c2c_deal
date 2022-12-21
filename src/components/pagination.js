import { useEffect, useState, useRef } from 'react';
import {
  Link
} from "react-router-dom";

import './pagination.scss';

export default function Pagination({ pagination, setNowPage, nowPage }) {
  const [pageArr, setPageArr] = useState([]);
  
  useEffect(() => {
    if(pagination.total_pages) {
      
      setPageArr(Array.from({ length: pagination.total_pages }, (_, i) => i + 1));
      console.log(pageArr);

    }
  }, [pagination]);

  const updatePage = (page) => {
    // if(nowPage >= pagination.total_pages) {
    //   return 
    // }
    setNowPage(page);
  }

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <ul className="pages">
        {pagination.has_pre && 
          <li className="page" onClick={() => updatePage(nowPage - 1)}>
            <a className="pageNum" href="#">
              <span aria-hidden="true">&#60;</span>
            </a>
          </li>
        }
        {pageArr.map((item) => 
          <li className="page" key={item} onClick={() => updatePage(item)}>
            <a href="#" className={`pageNum ${item == nowPage ? 'active' : ''}`}>{item}</a>
          </li>
        )}
        {pagination.has_next && 
          <li className="page" onClick={() => updatePage(nowPage + 1)}>
            <a className="pageNum" href="#">
                <span aria-hidden="true">&#62;</span>
            </a>
          </li>
        }
      </ul>
    </div>
  )
}