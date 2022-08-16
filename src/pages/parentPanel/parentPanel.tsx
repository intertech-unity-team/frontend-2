import React from 'react';
import { NotificationOutlined, UserOutlined, PaperClipOutlined, SendOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Table, Card, Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';
// !!!
import "antd/dist/antd.css";
import "./parentPanel.css";
import metamaskGif from './metamask.gif';
import { addSyntheticLeadingComment } from 'typescript';

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
      title: 'İptal',
      dataIndex: 'cancel',
      key: 'cancel',
      align: 'center' as AlignType
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
          <div className='send-money-container'>
              <b className='centering'><i>Wallet Balance</i></b>
                <i className='centering'>0x64AEB48</i>
                <div className='send-money'>
                  <p className='centering'>ETH ICON</p>
                  <b><i>Bakiye: 100 ETH</i></b>
                  <br/>
                  <b><i>AvailableBakiye: </i></b> 263 Milyar USD
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