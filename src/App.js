import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Resume from './components/Resume';
import ProtectedRoute from './components/ProtectedRoute';

import axios from 'axios';

axios.defaults.baseURL = '/api';  // Assuming your API is under /api
axios.defaults.withCredentials = true;  // This sends cookies with cross-origin requests
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Now, every axios request will automatically include the Authorization header
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/resume-frontend/login" element={<Login />} />
        <Route
          path="/resume-frontend"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />
        {/* Add other protected routes here */}
      </Routes>
    </Router>
  );
}

export default App;
