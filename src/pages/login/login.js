import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../../slices/userSlice';

import './login.scss';

export default function Login() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username: userName, password: password }));
    
  }


  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal text-center"><i className="fas fa-user-cog"></i>登入</h1>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" value={userName} onChange={(e) => {setUserName(e.target.value)}} required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" required />
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