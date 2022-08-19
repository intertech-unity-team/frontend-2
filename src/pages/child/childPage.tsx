import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Button, Input } from "antd";


// !!!
import "antd/dist/antd.css";
import "./child.css";
import logo from '../../assets/img/logo.png';
import backgroundImg from '../../assets/img/background-image.jpg';






const { Header, Content, Footer, Sider } = Layout;


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
    </a>, '2'),
  getItem(
    <a href="/child-profile" rel="noopener noreferrer" style={{color:"white"}}>
      Profil
    </a>
    , '1', <UserOutlined />), 
];


const ChildPage = () => {

    return (
    <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`}}>
      <Content style={{ padding: '0 0px' }}>
        <Layout style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})`}}>
          <Sider style={{background:"#2A2E30"}} width={200}>
          <img src={logo} alt="Logo" width="100%" height="200px"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", height:"49.3vh", width:"100.5%", color:"white"}}
              items={items}>
              </Menu>
              <img src={metamaskGif} alt="Metamask gif" width="100%" height="175"></img>
          </Sider>
          <Content style={{ padding: '0 0px', minHeight: 280}}>
            <div className='send-money-container'>
                  <div>
                    <b className='centering'><i>Havuzdaki Para</i></b>
                  </div>
                  <div className='send-money'>
                    <div className='toplam-para-text'>
                      <b>TOPLAM PARA</b>
                    </div>
                    
                    <div className='toplam-para-input'>
                      <Input className='toplam-para' placeholder='Toplam Para' size='middle' />
                    </div>

                    <div className='input-text'>
                      <b>Çekmek İstenilen Miktar</b>
                    </div>

                    <div className='input'>
                      <Input className='para-girisi' placeholder="Çekmek İstenilen Miktar" size='middle'/>
                    </div>
                    <br/>
                    <br/>
                    <div className='para-cek-butonu'>
                      <Button type="primary" className='center-the-button' shape="round" size="large">
                        Para Çek 
                      </Button>
                    </div>
                  </div>
              <br/>
            </div>
              
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white"}} className="site-layout-background">AppName ©2022 Created by Team Unity</Footer>
  </Layout>
  
    );
};

export default ChildPage;