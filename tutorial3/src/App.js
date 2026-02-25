import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import './App.css';

function App() {
  return (
    <Router>  {/* Wraps everything — enables URL-based navigation */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserList />} /> {/* URL = "/users" -> show UserList */}
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;