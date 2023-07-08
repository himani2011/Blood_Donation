import React from 'react';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import DonorSignup from './components/DonarSignup';
import OrgSignup from './components/OrgSignup';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import ErrorPage from './components/ErrorPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dsignup" element={<DonorSignup />} />
        <Route path="/osignup" element={<OrgSignup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/*' element={<ErrorPage/>} />
      </Routes>

    </div>
  )
}

export default App


