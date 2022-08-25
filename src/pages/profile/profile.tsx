import React from 'react';
import { TeamOutlined , UserOutlined, SolutionOutlined, SendOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Descriptions } from 'antd';
import { Form, Input, Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import { useState } from 'react';
import { ethers } from 'ethers';

// !!!
import "antd/dist/antd.css";
import "./profile.css";
import metamaskGif from '../../assets/images/metamask.gif';
import backgroundImg from '../../assets/img/another-background.png';
import logo from '../../assets/img/logo.png'
import { addSyntheticLeadingComment } from 'typescript';
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
    <a href="/profile" rel="noopener noreferrer" style={{color:"white"}}>
      Profil
    </a>
    , '1', <UserOutlined />),
  getItem(
      <a href="/child-add" rel="noopener noreferrer" style={{color:"white"}}>
      Çocuklar
      </a>, '2', <TeamOutlined />),
  getItem(
      <a href="/parent" rel="noopener noreferrer" style={{color:"white"}}>
      İşlemler
      </a>
    , 'sub1', <SolutionOutlined />, [
    getItem(
      <a href="/parent" rel="noopener noreferrer">
      Kripto Varlık Gönder
      </a>, '3'),
    getItem(
      <a href="/parent" rel="noopener noreferrer">
      Gönderim İptali
      </a>, '4'),
    getItem(
      <a href="/parent-withdraw" rel="noopener noreferrer">
      Para Çek
      </a>, '5'),
  ]),
];

async function getParentInfo() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Parent hesabını seçip sonra aşağıyı çalıştırın

  const getP = await contract.getParent();
  return getP;
}

const ProfilePage: React.FC = () => {
    // State hooks for getting input from the user 

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const [pName, setPName] = useState('');
    const [pSurname, setPSurname] = useState('');
    const [pWalletID, setPWalletID] = useState('');

    let parentInfoPromise = getParentInfo().then(
      function(result){
        console.log(result);
        setPName(result[0]);
        setPSurname(result[1]);
        setPWalletID(result[2]);
      }
    );

    
  

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const formItemLayout =
        formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            }
        : null;

    const buttonItemLayout =
        formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
            }
        : null;


    return (
    <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`}}>
      <Content style={{ padding: '0 0px' }}>
        <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})` , backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',}}>
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
              <h2 className='text'>Profilim Hos Geldiniz XXX</h2>
              <div className='form-container'>
              <Descriptions
                style={{padding:"1vh", width:"31vw"}}
                size='middle'
                bordered
                column={1}
                layout= 'vertical'
              >
                <Descriptions.Item label="Ad" contentStyle={{color:'#DADADA'}}>{pName}</Descriptions.Item>
                <Descriptions.Item label="Soyad" contentStyle={{color:'#DADADA'}}>{pSurname}</Descriptions.Item>
                <Descriptions.Item label="Wallet ID" contentStyle={{color:'#DADADA'}}>{pWalletID}</Descriptions.Item>
              </Descriptions>
              </div>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ProfilePage;