import React from 'react';
import 'App.css';
import Users from 'pages/Users';
import Vehicles from 'pages/Vehicles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/user/:id' element={<Vehicles />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
