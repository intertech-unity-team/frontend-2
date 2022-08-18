import React from 'react';
import { LinkOutlined, UserOutlined, TeamOutlined, SendOutlined, CloseCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Table, Card, Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';

// !!!
import "antd/dist/antd.css";
import "./parentPanel.css";
import metamaskGif from '../../assets/images/metamask.gif';
import logo from '../../assets/img/logo.png';
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
  ]),
];


const ParentPanel = () => {

  

  const dataSource = [
    {
      key: '1',
      sender: 'Mike',
      coin: 'eth',
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
      coin: 'eth',
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
      coin: 'eth',
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
      coin: 'eth',
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
              style={{background:"#2A2E30", height:"49.3vh", width:"100.5%", color:"white"}}
              items={items}>
              </Menu>
              <h1 style={{color: "snow", textAlign: 'center'}}>Bekleyen işlemler</h1>
              <img src={metamaskGif} alt="Metamask gif" width="100%" height="175px"></img>
          </Sider>
          <Content style={{ padding: '0 0px', minHeight: 280}}>
            <div className='send-money-container'>
                <b className='centering'><i>Wallet Balance</i></b>
                  <i className='centering'>0x64AEB48</i>
                  <div className='send-money'>
                    <h1 className='centering'>ETH ICON</h1>
                    <br/>
                    <b><i>Bakiye: 100 ETH</i></b>
                    <br/>
                    <b><i>AvailableBakiye: </i></b> 263 Milyar USD
                    <br/>
                    <Button type="primary" className='center-the-button' shape="circle" icon={<SendOutlined />} size="large"/>
                  </div>
              <br/>
            </div>
              
            
            <Table 
            dataSource={dataSource} 
            columns={columns} 
            className="table" 
            rowClassName="table-row" 
            bordered/>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white"}} className="site-layout-background">AppName ©2022 Created by Team Unity</Footer>
  </Layout>
  
    );
};

export default ParentPanel;