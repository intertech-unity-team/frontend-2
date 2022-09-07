import React from 'react';
import { TeamOutlined , UserOutlined, SolutionOutlined, HomeOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Card, MenuProps } from 'antd';
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
    <a href="/" rel="noopener noreferrer" style={{color:"white"}}>
      Anasayfa
    </a>
    , '0', <HomeOutlined />),
  getItem(
    <a href="/profile" rel="noopener noreferrer" style={{color:"white"}}>
      Profil
    </a>
    , '1', <UserOutlined />),
  getItem(
      <a href="/child-view" rel="noopener noreferrer" style={{color:"white"}}>
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
    <Layout className='layout'>
      <Content>
        <Layout className="site-layout-background">
          <Sider style={{background:"#2A2E30", height:'200%'}} width={200}>
          <img src={logo} alt="Logo" width="150%" height="20%"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", width:"100.5%", color:"white",minHeight: "80vh"}}
              items={items}>
              </Menu>
              
          </Sider>

          <Content>
            <Card className='profile-card'>
              <h2 className='header'>HESAP DETAYLARINIZ</h2>
              <Descriptions
                style={{width:"80%",position:'absolute', marginRight:'2%', marginLeft:'8%'}}
                size='small'
                bordered
                column={1}
                layout= 'vertical'
              >
                <Descriptions.Item label="Ad" contentStyle={{color:'#DADADA'}}>{pName}</Descriptions.Item>
                <Descriptions.Item label="Soyad" contentStyle={{color:'#DADADA'}}>{pSurname}</Descriptions.Item>
                <Descriptions.Item label="Wallet ID" contentStyle={{color:'#DADADA'}}>{pWalletID}</Descriptions.Item>
                <Descriptions.Item label="E-Posta" contentStyle={{color:'#DADADA'}}>x@gmail.com</Descriptions.Item>
                <Descriptions.Item label="Telefon Numarası" contentStyle={{color:'#DADADA'}}>5050523535</Descriptions.Item>
              </Descriptions>
              
            </Card>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ProfilePage;