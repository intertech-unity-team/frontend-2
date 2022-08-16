import React from 'react';
import { useState } from 'react';
import { ethers } from "ethers";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/home/homePage';
import LogInPage from './pages/login/loginPage';
import ChildPage from './pages/child/childPage';
import AdminPanel from './pages/admin/adminPage';
import { Button, Image } from 'antd';
import ErrorPage from './pages/error/errorPage';
import ParentPanel from './pages/parentPanel/parentPanel';



const App = () => {
  return (
    
    <div className='main'>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/child' element={<ChildPage />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/parent' element={<ParentPanel />} />
        </Routes>
      </BrowserRouter>

      

    </div>
  );
}

export default App;
