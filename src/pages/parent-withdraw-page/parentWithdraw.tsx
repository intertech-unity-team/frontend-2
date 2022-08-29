import React from 'react';
import { HomeOutlined, UserOutlined, TeamOutlined, SendOutlined, CloseCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import { Form, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import { Input, InputNumber } from 'antd/lib';

// !!!
import "antd/dist/antd.css";
import "./parentWithdrawStyle.css";
import metamaskGif from '../../assets/images/metamask.gif';
import logo from '../../assets/img/logo.png';
import ethLogo from '../../assets/img/eth_logo.png';
import backgroundImg from '../../assets/img/mny.png';
import { addSyntheticLeadingComment } from 'typescript';
import ProfilePage from '../profile/profile';
import FormItem from 'antd/es/form/FormItem';

const { Header, Content, Footer, Sider } = Layout;

let screenWidth = window.screen.width;
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
      </a>, '4'),
    
  ]),
];


const ParentWithdrawPage = () => {


    return (
      <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`, backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',height: '100%', overflow: 'hidden', position: 'fixed'}}>
        <Content style={{ padding: '0 0px' , overflow: 'hidden'}}>
          <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})` , backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',height: '100%', overflow: 'hidden'}}>
            <Sider style={{background:"#2A2E30"}} width={200}>
              <img src={logo} alt="Logo" width="150%" height="25%"></img>
              <Menu
                defaultSelectedKeys={['']}
                defaultOpenKeys={['']}
                style={{background:"#2A2E30", height:"71.2vh", width:"100.5%", color:"white"}}
                items={items}>
              </Menu>
            </Sider>

        <Content style={{ padding: '0 50px 0', minHeight: 280, overflow: 'hidden'}}>                      

          <div className='text-container'>
            <h1 style={{fontSize: '36px'}} className='text-main'>
              Kripto Varlık Çek
            </h1>
          </div>

          <div className='input-container'>
            <Form layout='vertical' className='input-xdlmao'>
              <Form.Item style={{marginTop: '5vh'}} label="Çekilebilen Tutar">
                <InputNumber disabled type={'number'} min={0} max={10} className='ilk-input' placeholder="Bakiye" size='middle' style={{width: '31%'}} ></InputNumber>
              </Form.Item>
              <Form.Item style={{marginTop: '8vh'}} label="Çekilecek Tutar">
                <InputNumber type={'number'} min={0} max={10} className='ilk-input' placeholder="Tutar Giriniz" size='middle' style={{width: '31%'}}></InputNumber>
              </Form.Item>
            </Form>
          </div>
          <div className='btn-div'>
            <Button className='btn' type='default' shape='round'>Para Çek</Button>
          </div>
        </Content>

      </Layout>
          </Content>

          <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>

      </Layout>
  
    );
};

export default ParentWithdrawPage;