import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const AddSatwaGambar = () => {
  const [nama_satwa, setNamaSatwa] = useState('');
  const [SatwaId, setSatwaId] = useState('');
  const [gambar, setGambar] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getSatwaById();
    setSatwaId(id);
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

  const saveSatwaGambar = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('gambar', gambar);

    let dataSatwaGambar = {
      SatwaId: parseInt(SatwaId)
    };

    formData.append('data', JSON.stringify(dataSatwaGambar));

    try {
      await axios.post(`${REACT_APP_BACKEND_HOST}/satwa-gambar`, formData);
      navigate(`/satwa/gambar/${id}`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <Link to={`/satwa/gambar/${id}`} className="button is-default mb-5"><span className="file-icon">
        <i className="fa fa-arrow-left"></i>
      </span>Kembali</Link>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">Data Donasi Satwa:</h1>
          <h2 className="title has-text-centered">{nama_satwa}</h2>
          <form onSubmit={saveSatwaGambar}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Gambar</label>
              <div className="control">
                <div className="file has-name">
                  <label className="file-label">
                    <input className="file-input" type="file" onChange={(e) => setGambar(e.target.files[0])} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fa fa-upload"></i>
                      </span>
                      <span className="file-label">
                        Pilih file…
                      </span>
                    </span>
                    <span className="file-name">{(gambar.name || 'Belum dipilih')}</span>
                  </label>
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

export default AddSatwaGambar
