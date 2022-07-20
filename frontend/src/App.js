import React, { useEffect } from 'react';
import { initiateSocketConnection, disconnectSocket } from './socketio.service'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Chat from './pages/Chat';
import NewUser from './pages/NewUser';
import Profile from './pages/Profile';
import Resident from './pages/Resident';

function App() {
  useEffect(() => {
    return () => {
      disconnectSocket()
    }
  }, []);

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<NewUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/message" element={<Chat />} />
            <Route path="/resident" element={<Resident />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
