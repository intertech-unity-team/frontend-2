import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, Descriptions } from 'antd';
import { Form } from "antd";
import {  UserOutlined, MenuFoldOutlined, HomeOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';

// !!!
import "antd/dist/antd.css";
import "./style.css";
import backgroundImg from '../../assets/img/another-background.png';
import logo from '../../assets/img/logo.png'
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import dayjs from 'dayjs';

const { Header, Content, Footer, Sider } = Layout;
type LayoutType = Parameters<typeof Form>[0]['layout'];


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <a href="/" rel="noopener noreferrer" style={{color:"white"}}>
    Anasayfa
    </a>, '0', <HomeOutlined />),
    getItem(
        <a href="/child" rel="noopener noreferrer" style={{color:"white"}}>
        İşlemler
        </a>, '2', <MenuFoldOutlined/>),
    getItem(
      <a href="/child-profile" rel="noopener noreferrer" style={{color:"white"}}>
        Profil
      </a>
      , '1', <UserOutlined />), 
  
];

async function getChildInfo() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Parent hesabını seçip sonra aşağıyı çalıştırın

  const getP = await contract.getChild();
  return getP;
}


const ChildProfilePage = () => {

  const [cName, setCName] = useState('');
  const [cSurname, setCSurname] = useState('');
  const [cWalletID, setCWalletID] = useState('');
  const [cBDay, setCBDay] = useState('');
  

  let parentInfoPromise = getChildInfo().then(
    function(result){
      console.log(result);
      setCName(result[0]);
      setCSurname(result[1]);
      setCWalletID(result[2]);
      let x = dayjs.unix(result[3]-568024668).toISOString().slice(0,10);
      let y = x.split("-");
      x = y[2] + "/" + y[1] + "/" + y[0];
      setCBDay(x);
      
    }
  );

    return (
      <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`}}>
      <Content style={{ padding: '0 0px' }}>
        <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})` , backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',}}>
          <Sider style={{background:"#2A2E30"}} width={200}>
          <img src={logo} alt="Logo" width="150%" height="200px"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", height:"71.2vh", width:"100.5%", color:"white"}}
              items={items}>
              </Menu>
              
          </Sider>

          <Content style={{ padding: '0 0px', minHeight: 280}}>
              <h2 className='text'>PROFİLİM</h2>
              <div className='form-container'>
              <Descriptions
                style={{padding:"1vh", width:"31vw"}}
                size='middle'
                bordered
                column={1}
                layout='vertical'

              >
                <Descriptions.Item label="Ad" contentStyle={{color:'#DADADA'}}>{cName}</Descriptions.Item>
                <Descriptions.Item label="Soyad" contentStyle={{color:'#DADADA'}}>{cSurname}</Descriptions.Item>
                <Descriptions.Item label="Metamask Cüzdan Adresi" contentStyle={{color:'#DADADA'}}>{cWalletID}</Descriptions.Item>
                <Descriptions.Item label="Doğum Tarihi" contentStyle={{color:'#DADADA'}}>{cBDay}</Descriptions.Item>

              </Descriptions>
              </div>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ChildProfilePage;