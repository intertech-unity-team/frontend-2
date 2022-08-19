import React from 'react';
import { LinkOutlined, UserOutlined, TeamOutlined, SendOutlined, CloseCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import { Input, InputNumber } from 'antd/lib';

// !!!
import "antd/dist/antd.css";
import "./style.css";
import metamaskGif from '../../assets/images/metamask.gif';
import logo from '../../assets/img/logo.png';
import ethLogo from '../../assets/img/eth_logo.png';
import backgroundImg from '../../assets/img/background-image.jpg';
import { addSyntheticLeadingComment } from 'typescript';
import ProfilePage from '../profile/profile';

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
      </a>, '4'),
    
  ]),
];


const ParentWithdrawPage = () => {

  

  const dataSource = [
    {
      key: '1',
      sender: 'Mike',
      coin: <img src={ethLogo} alt="Logo" width="31%" height="31px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'12.08.2022',
      address: '10 Downing Street',
      status: 'Askıda',
      cancel: <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size="small" style={{background: "red", }} />
    },
    {
      key: '2',
      sender: 'John',
      coin: <img src={ethLogo} alt="Logo" width="31%" height="31px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'12.08.2022',
      address: '10 Downing Street',
      status: 'Askıda',
      cancel: <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size="small" style={{background: "red", }} />
    },
    {
      key: '3',
      sender: 'Kevin',
      coin: <img src={ethLogo} alt="Logo" width="31%" height="31px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'12.08.2022',
      address: '10 Downing Street',
      status: 'Askıda',
      cancel: <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size="small" style={{background: "red", }} />
    },
    {
      key: '4',
      sender: 'Atilla',
      coin: <img src={ethLogo} alt="Logo" width="31%" height="31px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'12.08.2022',
      address: '10 Downing Street',
      status: 'Askıda',
      cancel: <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size="small" style={{background: "red", }} />
    },
    
    
  ];
  
  const columns = [
    {
      className: "table-col",
      title: 'Gönderici',
      dataIndex: 'sender',
      key: 'sender',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'Alıcı',
      dataIndex: 'receiver',
      key: 'receiver',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'Miktar',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'İşlem Durumu',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'Kısmi İptal',
      dataIndex: 'cancel-partial',
      key: 'cancel-partial',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'Tam İptal',
      dataIndex: 'cancel',
      key: 'cancel',
      align: 'center' as AlignType
    },
    
  ];


    return (
    <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`}}>
      <Content style={{ padding: '0 0px' }}>
        <Layout style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})`}}>
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
            <div className='send-money-container'>
                <b className='centering'><i>Para Çek</i></b>
                  <div className='send-money'>
                    <div className='toplam-para-text'>
                      <b>Çekilebilecek Toplam Miktar</b>
                    </div>
                    
                    <div className='toplam-para-input'>
                      <InputNumber className='toplam-para' placeholder='Toplam Para' size='middle' />
                    </div>

                    <div className='input-text'>
                      <b>Çekilecek Miktar</b>
                    </div>

                    <div className='input'>
                      <InputNumber className='para-girisi' placeholder="Çekmek İstenilen Miktar" size='middle'/>
                    </div>
                    <br/>
                    <br/>
                    
                    
                    <Button type="primary" className='center-the-button' shape="round" size="large">
                        Para Çek
                    </Button>
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

export default ParentWithdrawPage;