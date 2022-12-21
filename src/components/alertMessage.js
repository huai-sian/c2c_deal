import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage, removeMessage } from './../slices/alertMessageSlice';
import {
  Link
} from "react-router-dom";

import './alertMessage.scss';

export default function AlertMessage() {
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.alertMessage);

  const deleteMessage = (num) => {
    dispatch(removeMessage(num));
  }

  return (
    <div className="message-alert">
      {messages && messages.map((item, i) => (
        <div className='alert alert-warning alert-dismissible fade show' key={i}>
          {item.message}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => deleteMessage(i)} aria-label="Close">
          </button>
        </div>
      ))}
    </div>
  )
}