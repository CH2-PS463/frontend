import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const SatwaDonasiList = () => {
  const [nama_satwa, setNamaSatwa] = useState('');
  const [satwa_donasis, setSatwaDonasi] = useState([]);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getSatwaById();
    getSatwaDonasi();
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

  const getSatwaById = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BACKEND_HOST}/satwa/${id}`);
      setNamaSatwa(response.data.nama);
    } catch (error) {
      if (error.response) {
        navigate("/satwa");
      }
    }
  }

  const getSatwaDonasi = async () => {
    const response = await axios.get(`${REACT_APP_BACKEND_HOST}/satwa-donasi/satwa/${id}`);
    setSatwaDonasi(response.data);
  }

  const deleteSatwaDonasi = async (id) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_HOST}/satwa-donasi/${id}`);
      getSatwaDonasi();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <h1 className="title">Data Donasi Satwa: {nama_satwa}</h1>
      <div className="field is-grouped">
        <p className="control">
          <Link to="/satwa" className="button is-default"><span className="file-icon">
            <i className="fa fa-arrow-left"></i>
          </span>Kembali</Link>
        </p>
        <p className="control">
          <Link to={`/satwa/donasi/tambah/${id}`} className="button is-info"><span className="file-icon">
            <i className="fa fa-plus"></i>
          </span>Tambah</Link>
        </p>
      </div>
      <p className="has-text-centered">{msg}</p>
      <div className="table-container">
        <table className="table is-striped is-bordered is-fullwidth mt-5">
          <thead>
            <tr>
              <th>No.</th>
              <th>Donasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {satwa_donasis.map((satwa_donasi, index) => (
              <tr key={satwa_donasi.id}>
                <td>{index + 1}</td>
                <td>{satwa_donasi.Donasi.nama}</td>
                <td>
                  <div className="field is-grouped">
                    <p className="control">
                      <button onClick={() => { if (window.confirm('Apakah anda yakin ingin menghapus item ini?')) { deleteSatwaDonasi(satwa_donasi.id) }; }} className="button is-small is-danger"><span className="file-icon">
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

export default SatwaDonasiList
