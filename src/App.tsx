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
import ProfilePage from './pages/profile/profile';



const App = () => {
  return (
    
    <div className='main'>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/child' element={<ChildPage />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/parent' element={<ParentPanel />} />
          <Route path='/profile' element={<ProfilePage />} />

        </Routes>
      </BrowserRouter>

      

    </div>
  );
}

export default App;
