import './loginPage.css';
import { Layout, Menu, Form, Input, Button } from 'antd';
import React from 'react';
import backgroundImg from '../../assets/img/background-image.jpg';
import metamaskLogo from '../../assets/img/metamask_logo.png';
import teamLogo from '../../assets/img/logo.png';

const { Header, Content } = Layout;

function getParentPage() {
  window.location.href="http://localhost:3000/parent"
}

const LogInPage: React.FC = () => (
  
  <Layout className="layout">
    <Header style={{backgroundColor:"rgba(42, 46, 48, 1)", display:"flex"}}>
    <img src={teamLogo} alt="Unity Logo" width="65px" height="100%" style={{marginRight:"88vw", display:"flex", float:"left"}}/>
    <img src={metamaskLogo} alt="Metamask Logo" width="65px" height="100%" style={{display:"flex"}}/>
    
    </Header>
    <Content style={{ padding: '0 50px', backgroundImage:`url(${backgroundImg})`}}>
      <div className="site-layout-content" style={{padding:"10vh 30vw 0vh 30vw"}}>
        <div className='login-container'>
            <br/>
            <h1 style={{textAlign:"center", paddingBottom:"10vh", fontSize:"48px"}}>KAYIT OL</h1>
            <Form layout='vertical' style={{width:"75%", marginLeft:"auto", marginRight:"auto"}}>
                <Form.Item label="Adınız">
                    <Input placeholder="Adınızı giriniz" />
                    </Form.Item>
                    <Form.Item label="Soyadınız">
                        <Input placeholder="Soyadınızı giriniz" />
                    </Form.Item>
                    <Form.Item label="Wallet ID">
                        <Input placeholder="Wallet ID'nizi buraya yapıştırın" />
                    </Form.Item>
                    <div style={{textAlign:"center"}}>
                    <Button onClick={getParentPage} type="primary" className='btn-login' size='large' shape="round" style={{backgroundColor:"rgba(60, 60, 60, 1)"}}>Kaydol</Button>
                    </div>
                </Form>
              </div>
      </div>
      
    </Content>
  </Layout>
);


export default LogInPage;