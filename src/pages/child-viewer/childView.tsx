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
            
                    <Avatar size={avatarSize} icon={<UserOutlined />} src={'https://tr.toonpool.com/user/52657/files/fatih_terim_1690065.jpg'} />
                    <Avatar size={avatarSize} icon={<UserOutlined />} src={'data:image/jpeg;base64,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'} />
                    <Avatar size={avatarSize} icon={<UserOutlined />} src={'https://i.playboard.app/p/AAUvwnh6JP4DibrfQZksDjmqbTyi2f0DdAmt4LUUXStD/default.jpg'} />
                    <Avatar size={avatarSize} icon={<UserOutlined />} src={'https://i4.hurimg.com/i/hurriyet/75/1200x675/55ea8fcdf018fbb8f8880ffd.jpg'} />
                    <Avatar size={avatarSize} icon={<UserOutlined />} src={'https://pbs.twimg.com/media/EYqqUQYXgAYL2n6.jpg'} />
            </div>
          </Content>

        </Layout>
            </Content>

            <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>

        </Layout>
    );
      
    
};
  
export default ChildViewerPage;
