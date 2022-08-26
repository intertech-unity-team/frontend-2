import React, { useState } from 'react';
import { LinkOutlined, UserOutlined, TeamOutlined, SendOutlined, CloseCircleOutlined, SolutionOutlined, RollbackOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Slider, Space } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Table, Card, Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';

// !!!
import "antd/dist/antd.css";
import "./parentPanel.css";
import logo from '../../assets/img/logo.png';
import ethLogo from '../../assets/img/eth_logo.png';
import backgroundImg from '../../assets/img/mf.png';
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


const ParentPanel = () => {

  

  const dataSource = [
    {
      key: '1',
      sender: 'Mike',
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'12.08.2022',
      cancelPartial:<><Slider defaultValue={50} /> <Button type="primary" shape="circle" icon={<RollbackOutlined />} size="small" style={{background: "purple", }} /></>,
      status: 'Askıda',
      cancel: <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size="small" style={{background: "red", }} />
    },
    {
      key: '2',
      sender: 'John',
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'12.08.2022',
      cancelPartial:<><Slider defaultValue={50} /> <Button type="primary" shape="circle" icon={<RollbackOutlined />} size="small" style={{background: "purple", }} /></>,
      status: 'Askıda',
      cancel: <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size="small" style={{background: "red", }} />
    },
    {
      key: '3',
      sender: 'Kevin',
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'12.08.2022',
      cancelPartial:<><Slider defaultValue={50} /> <Button type="primary" shape="circle" icon={<RollbackOutlined />} size="small" style={{background: "purple", }} /></>,
      status: 'Askıda',
      cancel: <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size="small" style={{background: "red", }} />
    },
    {
      key: '4',
      sender: 'Atilla',
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'12.08.2022',
      cancelPartial:<><Slider defaultValue={50} /> <Button type="primary" shape="circle" icon={<RollbackOutlined />} size="small" style={{background: "purple", }} /></>,
      status: 'Askıda',
      cancel: <Button type="primary" danger shape="circle" icon={<CloseCircleOutlined />} size="small" style={{background: "red", }} />
    },
    {
      key: '4',
      sender: 'Osayi',
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px"></img>,
      receiver: '0xABCDEF',
      amount: '2.1',
      date:'15.08.2022',
      cancelPartial:<><Slider defaultValue={50} /> <Button type="primary" shape="circle" icon={<RollbackOutlined />} size="small" style={{background: "purple", }} /></>,
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
      title: 'Gönderimin Bir Kısmını Geri Çek',
      dataIndex: 'cancelPartial',
      key: 'cancelPartial',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'Gönderimi İptal Et',
      dataIndex: 'cancel',
      key: 'cancel',
      align: 'center' as AlignType
    },
    
  ];

let childKey = 0;
const [childName, setChildName] = useState("");
// Çocuk isimleri burada
let childrenArray = ["Çocuk 1 Ali", "Çocuk 2 Mahmut", "Çocuk 3 Hüseyin"];

// Dropdown menü ayarları
const handleMenuClick: MenuProps['onClick'] = e => {
    childKey = parseInt(e.key);
    setChildName(childrenArray[childKey]);
  };

  // Dropdown menü itemleri
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: childrenArray[0],
          key: '0',
          icon: <UserOutlined />,
        },
        {
          label: childrenArray[1],
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: childrenArray[2],
          key: '2',
          icon: <UserOutlined />,
        },
      ]}
    />
  );

    return (
    <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`}}>
      <Content style={{ padding: '0 0px' }}>
        <Layout style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})`}}>
          <Sider style={{background:"#2A2E30", bottom:0}} width={200}>
          <img src={logo} alt="Logo" width="100%" height="200px"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", height:"78vh", width:"100.5%", color:"white"}}
              items={items}>
              </Menu>
              
          </Sider>
          <Content style={{ padding: '0 0px', minHeight: 280}}>
            <div className='send-money-container'>
                <b className='centering' style={{}} ><i>Cüzdan Bakiyesi: 3.2 ETH</i></b>
                  <i className='centering'>0xE086BE6D51137948c7E1F45a4994BC041a711E56</i>
                  <br/>
                  <div className='centering'>
                  <b>Göndermek istediğiniz çocuğunuzu seçiniz:</b>
                  <Dropdown overlay={menu}>
                      <Button>
                          <Space>
                          {childName}
                          <DownOutlined />
                          </Space>
                          </Button>
                  </Dropdown>
                  </div>
                  <div className='send-money'>
                  <Button type="primary" className='center-the-button' shape="circle" icon={<SendOutlined />} size="large"/>
                    
                  </div>
                  
              <br/>
            </div>
              
            
            <Table 
            dataSource={dataSource} 
            columns={columns} 
            className="table" 
            rowClassName="table-row" 
            bordered
            pagination={{ pageSize: 4 }}
            style={{}}/>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">AppName ©2022 Created by Team Unity</Footer>
  </Layout>
  
    );
};

export default ParentPanel;