import React, { useState } from 'react';
import { LinkOutlined, UserOutlined, TeamOutlined, SendOutlined, CloseCircleOutlined, SolutionOutlined, RollbackOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Form, Input, MenuProps, Slider, Space } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Table, Card, Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';

// !!!
import "antd/dist/antd.css";
import "./parentPanel.css";
import logo from '../../assets/img/logo.png';
import ethLogo from '../../assets/img/eth_logo.png';
import backgroundImg from '../../assets/img/q.png';


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
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px" style={{borderRadius:"20px"}}></img>,
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
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px" style={{borderRadius:"20px"}}></img>,
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
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px" style={{borderRadius:"20px"}}></img>,
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
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px" style={{borderRadius:"20px"}}></img>,
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
      coin: <img src={ethLogo} alt="Logo" width="30px" height="30px" style={{borderRadius:"20px"}}></img>,
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
      title: 'Alıcı Adı',
      dataIndex: 'sender',
      key: 'sender',
      align: 'center' as AlignType
    },
    {
      className: "table-col",
      title: 'Alıcı Wallet ID',
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
      <Layout>
        <Content>
          <Layout>
            <Content>
              <div>
                <img src={backgroundImg} style={{width:'100%', position:'relative'}}></img>
                <h2 style={{position:'absolute',top:'19vh',left:'44vw',color:'#fff',fontSize:'36px'}}>Kripto Varlık Gönder</h2>
                <h2 style={{position:'absolute',top:'30vh',left:'48vw',color:'#fff',fontSize:'18px'}}>Çocuk Seç</h2>
                <Form layout='vertical' className='input-xdlmao'>
                  <Form.Item style={{position:'absolute',top:'37vh',left:'48vw',width:'40%'}} label="Çocuk Adı">
                    <Input className='ilk-input' placeholder="Çocuk Adı" size='middle' style={{width: '31%'}} ></Input>
                  </Form.Item>
                  <Form.Item style={{position:'absolute',top:'48vh',left:'48vw',width:'40%'}} label="Çocuk Wallet ID">
                    <Input className='ilk-input' placeholder="Wallet ID Giriniz" size='middle' style={{width: '31%'}}></Input>
                  </Form.Item>
                  <h2 style={{position:'absolute',top:'61vh',left:'48vw',color:'#fff',fontSize:'18px'}}>
                    Gönderilecek Tutar
                  </h2>
                  <Form.Item style={{position:'absolute',top:'67vh',left:'48vw',width:'40%'}}>
                    <Input className='ilk-input' placeholder="Miktar..." size='middle' style={{width: '31%'}}></Input>
                  </Form.Item>
                </Form>
                <Button type='default' shape='round' style={{borderColor:'#fff',background:'transparent',color:'#fff',position:'absolute',top:'73vh',left:'49.2vw',width:'10vw'}}>GÖNDER</Button>
                
                <div style={{position:'absolute',top:'30vh',left:'54vw',backgroundColor:'#fff'}}>
                  <Dropdown overlay={menu}>
                        <Button>
                            <Space>
                            {childName}
                            <DownOutlined />
                            </Space>
                            </Button>
                  </Dropdown>
                </div>
                <Sider style={{background:"#2A2E30", bottom:0,position:'absolute',top:'0vh'}} width={200}>
                  <img src={logo} alt="Logo" width="150%" height="30%"></img>
                  <Menu
                    defaultSelectedKeys={['']}
                    defaultOpenKeys={['']}
                    style={{background:"#2A2E30", height:"119.79vh", width:"100.5%", color:"white"}}
                    items={items}>
                  </Menu>
          
                </Sider>
                <Table
                  rowClassName={'table-row-light'}
                  dataSource={dataSource} 
                  columns={columns} 
                  bordered
                  pagination={{ pageSize: 3 }}
                  style={{position:'absolute',top:'83vh',left:'31.5vw'}}/>
                <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%",top:'145vh'}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
      
  
    );
};

export default ParentPanel;