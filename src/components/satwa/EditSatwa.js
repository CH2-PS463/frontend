import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const REACT_APP_BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const EditSatwa = () => {
  const [nama, setNama] = useState('');
  const [nama_saintifik, setNamaSaintifik] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [gambar_lokasi, setGambarLokasi] = useState('');
  const [gambar_lokasi_exist, setGambarLokasiExist] = useState('');
  const [populasi, setPopulasi] = useState('');
  const [funfact, setFunfact] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getSatwaById();
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

  const updateSatwa = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('gambar_lokasi', gambar_lokasi);

    let dataSatwa = {
      nama: nama,
      nama_saintifik: nama_saintifik,
      lokasi: lokasi,
      populasi: populasi,
      funfact: funfact
    };

    formData.append('data', JSON.stringify(dataSatwa));

    try {
      await axios.put(`${REACT_APP_BACKEND_HOST}/satwa/${id}`, formData);
      navigate("/satwa");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  }

  const getSatwaById = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BACKEND_HOST}/satwa/${id}`);
      setNama(response.data.nama);
      setNamaSaintifik(response.data.nama_saintifik);
      setLokasi(response.data.lokasi);
      if (response.data.gambar_lokasi) setGambarLokasiExist(response.data.gambar_lokasi);
      setPopulasi(response.data.populasi);
      setFunfact(response.data.funfact);
    } catch (error) {
      if (error.response) {
        navigate("/satwa");
      }
    }
  }

  return (
    <div className="container is-fluid mt-5">
      <Link to="/satwa" className="button is-default mb-5"><span className="file-icon">
        <i className="fa fa-arrow-left"></i>
      </span>Kembali</Link>
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered">Data Satwa</h1>
          <form encType="multipart/form-data" onSubmit={updateSatwa}>
            <p className="has-text-centered">{msg}</p>
            <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input type="text" className="input" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Nama Saintifik (Opsional)</label>
              <div className="control">
                <input className="input" placeholder="Nama Saintifik" value={nama_saintifik} onChange={(e) => setNamaSaintifik(e.target.value)}></input>
              </div>
            </div>
            <div className="field">
              <label className="label">Lokasi (Opsional)</label>
              <div className="control">
                <input type="text" className="input" placeholder="Lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
              </div>
            </div>
            {gambar_lokasi_exist ? (
              <figure className="image is-horizontal-center"><img style={{ width: '200px' }} src={gambar_lokasi_exist} alt={lokasi} /></figure>
            ) : ('')}
            <div className="field">
              <label className="label">Gambar Lokasi (Opsional)</label>
              <div className="control">
                <div className="file has-name">
                  <label className="file-label">
                    <input className="file-input" type="file" onChange={(e) => setGambarLokasi(e.target.files[0])} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fa fa-upload"></i>
                      </span>
                      <span className="file-label">
                        Pilih file…
                      </span>
                    </span>
                    <span className="file-name">{(gambar_lokasi.name || 'Belum dipilih')}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Populasi (Opsional)</label>
              <div className="control">
                <input type="text" className="input" placeholder="Populasi" value={populasi} onChange={(e) => setPopulasi(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Fun Facts (Opsional)</label>
              <div className="control">
                <textarea type="text" className="textarea" placeholder="Fun Facts" value={funfact} onChange={(e) => setFunfact(e.target.value)} ></textarea>
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

export default EditSatwa
