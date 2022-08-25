import React from "react";
import './style.css';
import { Button, DatePicker, Form, Input, Layout, Menu, MenuProps, Avatar } from 'antd';
import backgroundImg from '../../assets/img/lol.png';
import logo from '../../assets/img/logo.png'
import { TeamOutlined , UserOutlined, SolutionOutlined, SendOutlined, DownOutlined } from '@ant-design/icons';


const { Header, Footer, Sider, Content } = Layout;
let screenWidth = window.screen.width;
type MenuItem = Required<MenuProps>['items'][number];
let avatarSize = 100;

function getChildAddPage() {
    window.location.href='http://localhost:3000/child-add';
}

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
        <a href="/parent" rel="noopener noreferrer">
        Gönderim İptali
        </a>, '4'),
      getItem(
        <a href="/parent-withdraw" rel="noopener noreferrer">
        Para Çek
        </a>, '5'),
    ]),
  ];


const ChildViewerPage: React.FC = () => {
    return (
        <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%', overflow: 'hidden', position: 'fixed'}}>


            <Content style={{ padding: '0 0px' , overflow: 'hidden'}}>
            <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})` , backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%', overflow: 'hidden'}}>
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
                        
            <div className="float-container">



                <div className='float-child-right' style={{minWidth: screenWidth / 7, overflow: 'hidden'}}>
                    <h1 style={{textAlign:"center", fontSize:"28px", overflow: 'hidden' , color:'#DADADA'}}>Çocuklarım</h1>
                    
                </div>

                <Button className="btn" onClick={getChildAddPage} shape="round">Cocuk Ekle +</Button>
            </div>
            <div className="mid-container" style={{display:"flex",justifyContent:"space-around", width:"50%"}}>
            
                    <Avatar size={avatarSize} icon={<UserOutlined />} />
                    <Avatar size={avatarSize} icon={<UserOutlined />} />
                    <Avatar size={avatarSize} icon={<UserOutlined />} />
                    <Avatar size={avatarSize} icon={<UserOutlined />} />
                    <Avatar size={avatarSize} icon={<UserOutlined />} />
            </div>
          </Content>

        </Layout>
            </Content>

            <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>

        </Layout>
    );
      
    
};
  
export default ChildViewerPage;
