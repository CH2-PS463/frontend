import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SatwaList from "./components/satwa/SatwaList";
import AddSatwa from "./components/satwa/AddSatwa";
import EditSatwa from "./components/satwa/EditSatwa";
import SatwaDonasiList from "./components/satwa/SatwaDonasiList";
import AddSatwaDonasi from "./components/satwa/AddSatwaDonasi";
import SatwaGambarList from "./components/satwa/SatwaGambarList";
import AddSatwaGambar from "./components/satwa/AddSatwaGambar";
import DonasiList from "./components/donasi/DonasiList";
import AddDonasi from "./components/donasi/AddDonasi";
import EditDonasi from "./components/donasi/EditDonasi";
import Predict from "./components/Predict";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/satwa" element={<><Navbar /><SatwaList /></>} />
        <Route path="/satwa/tambah" element={<><Navbar /><AddSatwa /></>} />
        <Route path="/satwa/edit/:id" element={<><Navbar /><EditSatwa /></>} />
        <Route path="/satwa/donasi/:id" element={<><Navbar /><SatwaDonasiList /></>} />
        <Route path="/satwa/donasi/tambah/:id" element={<><Navbar /><AddSatwaDonasi /></>} />
        <Route path="/satwa/gambar/:id" element={<><Navbar /><SatwaGambarList /></>} />
        <Route path="/satwa/gambar/tambah/:id" element={<><Navbar /><AddSatwaGambar /></>} />
        <Route path="/donasi" element={<><Navbar /><DonasiList /></>} />
        <Route path="/donasi/tambah" element={<><Navbar /><AddDonasi /></>} />
        <Route path="/donasi/edit/:id" element={<><Navbar /><EditDonasi /></>} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
