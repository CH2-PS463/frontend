import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const DonasiList = () => {
  const [donasis, setDonasi] = useState([]);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getDonasi();
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

  const getDonasi = async () => {
    const response = await axios.get(`${REACT_APP_BACKEND_HOST}/donasi`);
    setDonasi(response.data);
  }

  const deleteDonasi = async (id) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_HOST}/donasi/${id}`);
      getDonasi();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <h1 className="title">Data Donasi</h1>
      <Link to="/donasi/tambah" className="button is-info"><span className="file-icon">
        <i className="fa fa-plus"></i>
      </span>Tambah</Link>
      <p className="has-text-centered">{msg}</p>
      <div className="table-container">
        <table className="table is-striped is-bordered is-fullwidth mt-5">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {donasis.map((donasi, index) => (
              <tr key={donasi.id}>
                <td>{index + 1}</td>
                <td>{donasi.nama}</td>
                <td>{(donasi.deskripsi && donasi.deskripsi !== "") ? donasi.deskripsi : "-"}</td>
                <td>
                  <div className="field is-grouped">
                    <p className="control">
                      <Link to={`edit/${donasi.id}`} className="button is-small is-primary"><span className="file-icon">
                        <i className="fa fa-edit"></i>
                      </span>Edit</Link>
                    </p>
                    <p className="control">
                      <button onClick={() => { if (window.confirm('Apakah anda yakin ingin menghapus item ini?')) { deleteDonasi(donasi.id) }; }} className="button is-small is-danger"><span className="file-icon">
                        <i className="fa fa-remove"></i>
                      </span>Hapus</button>
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DonasiList
