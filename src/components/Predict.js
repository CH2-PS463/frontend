import React, { useState } from 'react';
import axios from 'axios';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const Predict = () => {
  const [nama, setNama] = useState('-');
  // const [nama_saintifik, setNamaSaintifik] = useState('-');
  // const [lokasi, setLokasi] = useState('-');
  // const [populasi, setPopulasi] = useState('-');
  // const [funfact, setFunfact] = useState('-');
  const [msg, setMsg] = useState('');
  const [gambar, setGambar] = useState('');

  const predict = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('file', gambar);

    try {
      const response = await axios.post(`${REACT_APP_BACKEND_HOST}/predict`, formData);
      if (response.data.message) {
        setMsg(response.data.message);
      } else {
        setNama(response.data.name);
        // setNamaSaintifik(response.data.nama_saintifik);
        // setLokasi(response.data.lokasi);
        // setPopulasi(response.data.populasi);
        // setFunfact(response.data.funfact);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">Predict Satwa:</h1>
          <form onSubmit={predict}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Gambar</label>
              <div className="control">
                <div className="file has-name">
                  <label className="file-label">
                    <input className="file-input" type="file" name="resume" onChange={(e) => setGambar(e.target.files[0])} />
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
              </span>Predict</button>
            </div>
          </form>
        </div>
      </div>
      <hr />
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <p>Nama: {nama}</p>
          {/* <p>Nama Saintifik: {nama_saintifik}</p>
          <p>Lokasi: {lokasi}</p>
          <p>Populasi: {populasi}</p>
          <p>Fun Facts: {funfact}</p> */}
        </div>
      </div>
    </div>
  )
}

export default Predict
