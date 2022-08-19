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
import ChildAddPage from './pages/child-add/childAddPage';
import ChildProfilePage from './pages/child-profile/childProfile';
import ParentWithdrawPage from './pages/parent-withdraw-page/parentWithdraw';
import { PATENT_ABI, PATENT_ADDRESS } from './constants/MyProject';

// Videodan alınan kod



const App = () => {

  const createApplication = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  
    const signer = provider.getSigner();
    const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);
    
    const deneme = await contract.getParent();
  
    console.log(deneme);
  
  }

  //createApplication();

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
          <Route path='/child-add' element={<ChildAddPage />} />
          <Route path='/child-profile' element={<ChildProfilePage />} />
          <Route path='/parent-withdraw' element={<ParentWithdrawPage />} />

        </Routes>
      </BrowserRouter>

      

    </div>
  );
}

export default App;
