import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const SatwaList = () => {
  const [satwas, setSatwa] = useState([]);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getSatwa();
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

  const getSatwa = async () => {
    const response = await axios.get(`${REACT_APP_BACKEND_HOST}/satwa`);
    setSatwa(response.data);
  }

  const deleteSatwa = async (id) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_HOST}/satwa/${id}`);
      getSatwa();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <h1 className="title">Data Satwa</h1>
      <Link to="/satwa/tambah" className="button is-info"><span className="file-icon">
        <i className="fa fa-plus"></i>
      </span>Tambah</Link>
      <p className="has-text-centered">{msg}</p>
      <div className="table-container">
        <table className="table is-striped is-bordered is-fullwidth mt-5">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Nama Saintifik</th>
              <th>Lokasi</th>
              <th>Populasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {satwas.map((satwa, index) => (
              <tr key={satwa.id}>
                <td>{index + 1}</td>
                <td>{satwa.nama}</td>
                <td>{(satwa.nama_saintifik && satwa.nama_saintifik !== "") ? satwa.nama_saintifik : "-"}</td>
                <td>{(satwa.lokasi && satwa.lokasi !== "") ? satwa.lokasi : "-"}</td>
                <td>{(satwa.populasi && satwa.populasi !== "") ? satwa.populasi : "-"}</td>
                <td>
                  <div className="field is-grouped">
                    <p className="control">
                      <Link to={`donasi/${satwa.id}`} className="button is-small is-warning"><span className="file-icon">
                        <i className="fa fa-handshake-o"></i>
                      </span>Donasi</Link>
                    </p>
                    <p className="control">
                      <Link to={`gambar/${satwa.id}`} className="button is-small is-success"><span className="file-icon">
                        <i className="fa fa-image"></i>
                      </span>Gambar</Link>
                    </p>
                    <p className="control">
                      <Link to={`edit/${satwa.id}`} className="button is-small is-primary"><span className="file-icon">
                        <i className="fa fa-edit"></i>
                      </span>Edit</Link>
                    </p>
                    <p className="control">
                      <button onClick={() => { if (window.confirm('Apakah anda yakin ingin menghapus item ini?')) { deleteSatwa(satwa.id) }; }} className="button is-small is-danger"><span className="file-icon">
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

export default SatwaList
