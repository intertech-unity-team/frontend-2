import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, Descriptions } from 'antd';
import { Form } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import {  UserOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';

// !!!
import "antd/dist/antd.css";
import "./style.css";
import backgroundImg from '../../assets/img/background-image.jpg';
import logo from '../../assets/img/logo.png'
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';

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
        <a href="/child" rel="noopener noreferrer" style={{color:"white"}}>
        Ana Sayfa
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

  let parentInfoPromise = getChildInfo().then(
    function(result){
      console.log(result);
      setCName(result[0]);
      setCSurname(result[1]);
      setCWalletID(result[2]);
    }
  );

    return (
    <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`}}>
      <Content style={{ padding: '0 0px' }}>
        <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})`}}>
          <Sider style={{background:"#2A2E30"}} width={200}>
          <img src={logo} alt="Logo" width="100%" height="200px"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", height:"71.2vh", width:"100.5%", color:"white"}}
              items={items}>
              </Menu>
          </Sider>

          <Content style={{ padding: '0 0px', minHeight: 280}}>
              <div className='havuzdaki-para'>
                
              </div>


              <div className='form-container'>
              <Descriptions
                style={{paddingLeft:"50px"}}
                title="Profil Detayları"
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Ad">{cName}</Descriptions.Item>
                <Descriptions.Item label="Soyad">{cSurname}</Descriptions.Item>
                <Descriptions.Item label="Wallet ID">{cWalletID}</Descriptions.Item>
              </Descriptions>
              </div>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">AppName ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ChildProfilePage;