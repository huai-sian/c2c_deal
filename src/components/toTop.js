import { useEffect, useState, useRef } from 'react';
import {
  Link
} from "react-router-dom";

import './toTop.scss';

export default function Totop() {
  const elementTop = useRef();

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  window.addEventListener('scroll', function() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      if(elementTop.current) {
        elementTop.current.style.opacity = '1'
      }
    }
    else if (scrolled <= 300){
      if(elementTop.current) {
        elementTop.current.style.opacity = '0'
      }
    }
  });

  return (
    <div className="toTop" onClick={scrollTop} ref={elementTop}>
      <i className="fa fa-angle-double-up"></i>
    </div>
  )
}