import React from 'react';
import { TeamOutlined , UserOutlined, SolutionOutlined, SendOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Descriptions } from 'antd';
import { Form, Input, Button, Dropdown, Space } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import { useState } from 'react';

// !!!
import "antd/dist/antd.css";
import './parentPanelChild.css';
import metamaskGif from '../../assets/images/metamask.gif';
import backgroundImg from '../../assets/img/background-image.jpg';
import logo from '../../assets/img/logo.png'
import { addSyntheticLeadingComment } from 'typescript';

const { Header, Content, Footer, Sider } = Layout;
type LayoutType = Parameters<typeof Form>[0]['layout'];

let childKey = 0;

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
      <a href="/child" rel="noopener noreferrer" style={{color:"white"}}>
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



const ParentPanelChildPage: React.FC = () => {
    // State hooks for getting input from the user 
    const [formName, setFormName] = useState("");
    const [formSurname, setFormSurname] = useState("");

    const [childName, setChildName] = useState("");

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

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
        <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})`}}>
          <Sider style={{background:"#2A2E30"}} width={200}>
          <img src={logo} alt="Logo" width="100%" height="200px"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", height:"71.2vh", width:"100.5%", color:"white"}}
              items={items}>
              </Menu>
          </Sider>

          <Content style={{ padding: '0 50px 0', minHeight: 280}}>
            <div className="float-container">
              <div className='float-child-left'>
                <h1>Çocuk Bilgilerini Güncelle</h1>
                <br/>
                <p>Çocuk Seç</p>
                <Dropdown overlay={menu}>
                    <Button>
                        <Space>
                        {childName}
                        <DownOutlined />
                        </Space>
                        </Button>
                </Dropdown>
                <br/>
                <br/>
                <Form layout='vertical' >
                <Form.Item label="Çocuk İsmi">
                    <Input placeholder="İsim giriniz" />
                    </Form.Item>
                    <Form.Item label="Çocuğun Wallet ID'si">
                        <Input placeholder="Wallet ID giriniz" />
                    </Form.Item>
                    <Form.Item label="Çocuğun Doğum Tarihi">
                        <Input placeholder="GG/AA/YYYY" />
                    </Form.Item>
                    <Button type="primary" className='btn-update'>Çocuk Bilgilerini Güncelle</Button>
                    <Button type="primary" danger className='btn-delete'>Çocuğu Sil</Button>
                </Form>
              </div>
              <div className='float-child-middle'></div>
              <div className='float-child-right'>
              <h1>Yeni Çocuk Ekle</h1>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Form layout='vertical' >
                <Form.Item label="Çocuk İsmi">
                    <Input placeholder="İsim giriniz" />
                    </Form.Item>
                    <Form.Item label="Çocuğun Wallet ID'si">
                        <Input placeholder="Wallet ID giriniz" />
                    </Form.Item>
                    <Form.Item label="Çocuğun Doğum Tarihi">
                        <Input placeholder="GG/AA/YYYY" />
                    </Form.Item>
                    <Button type="primary" className='btn-update'>Çocuk Ekle</Button>
                
                    </Form>
                </div>
              </div>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white"}} className="site-layout-background">AppName ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ParentPanelChildPage;