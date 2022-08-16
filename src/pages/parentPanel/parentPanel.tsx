import React from 'react';
import { NotificationOutlined, UserOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Table, Card } from "antd";
// !!!
import "antd/dist/antd.css";
import "./parentPanel.css";
import metamaskGif from './metamask.gif';

const { Header, Content, Footer, Sider } = Layout;


const menuItems = ["Profil","Çocuk","Contractlarım","Sweet Bonanza"]

const items1: MenuProps['items'] = ['1', '2', '3', '4'].map(key => ({
    key,
    label: `nav ${key}`,
  }));

  const items2: MenuProps['items'] = [UserOutlined, UserOutlined, PaperClipOutlined, PaperClipOutlined].map(
    (icon, index) => {
      const key = String(index + 1);

      return {
        style: {color:"white"},
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `${menuItems[index]}`,

        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    },
  );


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
      cancel: "x"
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
      cancel: "x"
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
      cancel: "x"
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
      cancel: "x"
    },
    
    
  ];
  
  const columns = [
    {
      className: "table-col",
      title: 'Gönderici',
      dataIndex: 'sender',
      key: 'sender',
    },
    {
      className: "table-col",
      title: 'Alıcı',
      dataIndex: 'receiver',
      key: 'receiver',
    },
    {
      className: "table-col",
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      className: "table-col",
      title: 'Miktar',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      className: "table-col",
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
    },
    {
      className: "table-col",
      title: 'İşlem Durumu',
      dataIndex: 'status',
      key: 'status',
    },
    {
      className: "table-col",
      title: '',
      dataIndex: 'cancel',
      key: 'cencel',
    }
  ];


    return (
    <Layout className='layout'>
    <Content style={{ padding: '0 0px' }}>
      <Layout className="site-layout-background" style={{ padding: '0px 0' }}>
        <Sider style={{background:"#2A2E30"}} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['']}
            defaultOpenKeys={['']}
            style={{background:"#2A2E30", height:"60%", width:"100.5%"}}
            items={items2}>
            </Menu>
            <h1 style={{color: "snow", textAlign: 'center'}}>Bekleyen işlemler</h1>
            <img src={metamaskGif} alt="Metamask gif" width="100%" height="175"></img>
        </Sider>

        <Content style={{ padding: '0 0px', minHeight: 280}}>
        <b><i>Wallet Balance</i></b>
            <br/>
          <i>0x64AEB48</i>
          <div className='send-money'>
            ETH ICON
            <br/>
            <b><i>Bakiye: 100 ETH</i></b>
            <br/>
            <b><i>AvailableBakiye: </i></b> 263 Milyar USD
            <br/>
            <SendOutlined/>

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