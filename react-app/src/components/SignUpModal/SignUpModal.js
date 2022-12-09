
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUp.css'
import { useHistory } from 'react-router-dom';

const SignUpForm = ({setShowSignUpModal}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName));
      if (!data.id) {
        setErrors(data)
      }
      else{
        // history.push(`/${data.username}`)
        history.push('/')
      }
    }
    else{
        let error = ['Passwords do not match!']
        setErrors(error);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) =>{
    setLastName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-container'>
        <div className='signup-caption'>
            Create an account
        </div>
        <form onSubmit={onSignUp} className='signup-form'>
        <div>
            {errors.map((error, ind) => (
            <div key={ind} className='error'>{error}</div>
            ))}
        </div>
        <label>User Name</label>
        <div>
            <input
            className = 'signup-input-box'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            ></input>
        </div>
        <label>First Name</label>
        <div>
            <input
            className = 'signup-input-box'
            type='text'
            name='firstName'
            onChange={updateFirstName}
            value={firstName}
            ></input>
        </div>
        <label>Last Name</label>
        <div>
            <input
            className = 'signup-input-box'
            type='text'
            name='lastName'
            onChange={updateLastName}
            value={lastName}
            ></input>
        </div>
        <label>Email</label>
        <div>
            <input
            className = 'signup-input-box'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            ></input>
        </div>
        <label>Password</label>
        <div>
            <input
            className = 'signup-input-box'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            ></input>
        </div>
        <label>Repeat Password</label>
        <div>
            <input
            className = 'signup-input-box'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            ></input>
        </div>
        <button type='submit' className='signup-button'>Sign Up</button>

        <div className='back-to-login'>
            <div className='back-to-caption'>
                Already have an account?
            </div>
            <div className='login-link' onClick={() =>{
                setShowSignUpModal(false)
            }}>
                Login
            </div>
        </div>
        </form>

    </div>
  );
};

export default SignUpForm;
