import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      await axios.get(`${REACT_APP_BACKEND_HOST}/auth/token`);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(`${REACT_APP_BACKEND_HOST}/auth/token`);
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setEmail(decoded.email);
      setExpire(decoded.exp);
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.get(`${REACT_APP_BACKEND_HOST}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  }

  return (
    <div className="container is-fluid mt-5">
      <h1 className="title has-text-centered">Selamat datang {email}</h1>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No.</th>
            <th>email</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
