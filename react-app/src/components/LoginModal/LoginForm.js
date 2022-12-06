import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './LoginModal.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (!data.id) {
      setErrors(data);
    }
    else{
        history.push(`/${data.username}/dm`)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-container'>
        <form onSubmit={onLogin} className='login-form'>
            <div className='login-caption'>
                Log in to Discord
            </div>
        <div>
            {errors.map((error, ind) => (
            <div key={ind} className={'error'}>{error}</div>
            ))}
        </div>
        <label htmlFor='email' className='login-label'>Email</label>
        <div>
            <input
            className='login-input-box'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            />
        </div>
        <label htmlFor='password' className='login-label'>Password</label>
        <div>
            <input
            className='login-input-box'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            />
        </div>
        <div>
            <button type='submit' className='login-button'>Login</button>

        </div>
        <div className='register-container'>
            <div className='reg-caption'>
                Need an account?
            </div>
            <div>
                 Register
            </div>

        </div>
        </form>

    </div>
  );
};

export default LoginForm;
