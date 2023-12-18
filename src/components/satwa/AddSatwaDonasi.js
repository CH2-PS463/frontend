import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const AddSatwaDonasi = () => {
  const [nama_satwa, setNamaSatwa] = useState('');
  const [SatwaId, setSatwaId] = useState('');
  const [DonasiId, setDonasiId] = useState('');
  const [donasis, setDonasi] = useState([]);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getSatwaById();
    setSatwaId(id);
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

  const getDonasi = async () => {
    const response = await axios.get(`${REACT_APP_BACKEND_HOST}/donasi`);
    setDonasi(response.data);
  }

  const saveSatwaDonasi = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${REACT_APP_BACKEND_HOST}/satwa-donasi`, {
        SatwaId: parseInt(SatwaId),
        DonasiId: parseInt(DonasiId)
      });
      navigate(`/satwa/donasi/${id}`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <Link to={`/satwa/donasi/${id}`} className="button is-default mb-5"><span className="file-icon">
        <i className="fa fa-arrow-left"></i>
      </span>Kembali</Link>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">Data Donasi Satwa:</h1>
          <h2 className="title has-text-centered">{nama_satwa}</h2>
          <form onSubmit={saveSatwaDonasi}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Donasi</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select onChange={(e) => setDonasiId(e.target.value)}>
                    <option value="">-- Pilih --</option>
                    {donasis.map((donasi) => (
                      <option key={donasi.id} value={donasi.id}>{`${donasi.nama} - ${donasi.lokasi}`}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-success"><span className="file-icon">
                <i className="fa fa-check"></i>
              </span>Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddSatwaDonasi
