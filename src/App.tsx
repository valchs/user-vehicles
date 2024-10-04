import React from 'react';
import 'App.css';
import Home from 'pages/Home';
import UserDetails from 'pages/UserDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/:id' element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
