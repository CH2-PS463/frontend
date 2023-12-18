import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      await axios.get(`${REACT_APP_BACKEND_HOST}/auth/token`);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  const Auth = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${REACT_APP_BACKEND_HOST}/auth/login`, {
        email: email,
        password: password
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <section className="hero has-background-grey-light is-success is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className="box">
                <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <button type="submit" className="button is-success is-fullwidth">Login</button>
                </div>
              </form>
              <p>Email: user@mail.com Pw: 123</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
