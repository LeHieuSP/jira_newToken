import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import backgroudImg from '../../assets/login-bg.jpg';
import classes from './Login.module.scss';
import { API_KEY } from '../../constants/Constants';
import { AuthActions } from '../../store/auth-slice';

function Login() {
  const [isSubmiting, setIsSubmiting] = useState(null);
  const [error, setError] = useState(undefined);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    try {
      setIsSubmiting(true);
      const loginResponse = await fetch(
        'https://jiranew.cybersoft.edu.vn/api/Users/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            TokenCybersoft: API_KEY,
          },
          body: JSON.stringify(loginData),
        },
      );
      const data = await loginResponse.json();
      setIsSubmiting(false);
      if (!loginResponse.ok) {
        throw new Error(data.message);
      }
      dispatch(AuthActions.login({ token: data.content.accessToken }));
      history.replace('/project');
    } catch (errorMessage) {
      setError(errorMessage.message);
    }
  };
  return (
    <div className={classes.LoginContainer}>
      <div className={classes.LoginBackground}>
        <img src={backgroudImg} alt="login-bg" />
      </div>
      <div className={classes.LoginForm}>
        <form onSubmit={submitHandler}>
          <div className={classes.InputBox}>
            <FontAwesomeIcon icon={faUser} />
            <input type="email" placeholder="email" ref={emailInputRef} />
          </div>
          <div className={classes.InputBox}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              placeholder="password"
              ref={passwordInputRef}
            />
          </div>
          {error && <p className={classes.ErrorText}>{error}</p>}
          <button type="submit" className={classes.SubmitBtn}>
            {isSubmiting ? '...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
