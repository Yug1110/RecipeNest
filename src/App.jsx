import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import AddItem from './pages/AddItem'

import { useState, useEffect } from 'react';

import { auth } from './firebase'
import SelectedContextProvider from './context/SelectedContext'

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <SelectedContextProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/addItem" element={<AddItem />} />
            </Routes>
          </div>
        </Router>
      </SelectedContextProvider>
    </>
  );
}

export default App;
