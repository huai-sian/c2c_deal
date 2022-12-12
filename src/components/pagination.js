import { useEffect, useState, useRef } from 'react';
import {
  Link
} from "react-router-dom";

import './pagination.scss';

export default function Pagination() {
  

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <ul className="pages">
        <li className="page">
          <a className="pageNum" href="#">
            <span aria-hidden="true">&#60;</span>
          </a>
        </li>
        <li className="page">
          <a className="pageNum" href="#">page</a>
        </li>
        <li className="page">
          <a className="pageNum" href="#">
              <span aria-hidden="true">&#62;</span>
          </a>
        </li>
      </ul>
    </div>
  )
}