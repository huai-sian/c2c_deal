import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../slices/userSlice';
import { useForm } from "react-hook-form";
import {
        useHistory,
      } from "react-router-dom";

import './login.scss';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmPsd, setShowConfirmPsd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const getToken = () => {
    if(localStorage.getItem('c2cToken') == 'undefined') {
      return null
    }
    return JSON.parse(localStorage.getItem('c2cToken')) || null;
  }

  const handleLogin = (data) => {
   // e.preventDefault();
    dispatch(login({ username: data.userName, password: data.password }));
  }

  useEffect(() => {
    if(getToken()) {
      history.push('/dashboard');
    }
  }, [])

  return (
    <form className="form-signin" onSubmit={handleSubmit(handleLogin)}>
      <h1 className="h3 mb-3 font-weight-normal text-center"><i className="fas fa-user-cog"></i>登入</h1>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input 
          type="email"
          id="inputEmail"
          className="form-control mb-3"
          required
          autoFocus
          {...register("userName", { required: true })} />
          {errors.userName ?.type === 'required' && <p>請輸入Email</p>}
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <div className="position-relative">
          <input 
            type={showConfirmPsd ? 'text' : 'password'}
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            {...register("password", { required: true })}
          />
          {errors.password ?.type === 'required' && <p>請輸入密碼</p>}
          {!showConfirmPsd && 
            <i className="fas fa-eye psd_visible position-absolute"
            onClick={() => setShowConfirmPsd(true)}></i>}
          {showConfirmPsd && 
            <i className="fas fa-eye-slash psd_invisible position-absolute"
            onClick={() => setShowConfirmPsd(false)}></i>}
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
      <button className="btn btn-lg btn-block btn-signin" type="submit">Sign in</button>
      <p className="mt-5 mb-3 text-muted">&copy; 2022 Pure Savon</p>
    </form>
  )
}