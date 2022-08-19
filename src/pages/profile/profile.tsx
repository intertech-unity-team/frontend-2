import React from 'react';
import { TeamOutlined , UserOutlined, SolutionOutlined, SendOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Descriptions } from 'antd';
import { Form, Input, Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import { useState } from 'react';

// !!!
import "antd/dist/antd.css";
import "./profile.css";
import metamaskGif from '../../assets/images/metamask.gif';
import backgroundImg from '../../assets/img/background-image.jpg';
import logo from '../../assets/img/logo.png'
import { addSyntheticLeadingComment } from 'typescript';

const { Header, Content, Footer, Sider } = Layout;
type LayoutType = Parameters<typeof Form>[0]['layout'];


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


const ProfilePage: React.FC = () => {
    // State hooks for getting input from the user 
    const [formName, setFormName] = useState("");
    const [formSurname, setFormSurname] = useState("");

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const formItemLayout =
        formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            }
        : null;

    const buttonItemLayout =
        formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
            }
        : null;

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

          <Content style={{ padding: '0 0px', minHeight: 280}}>
              <div className='form-container'>
              <Descriptions
                style={{paddingLeft:"50px"}}
                title="Profil Detayları"
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="Ad">Gabriel</Descriptions.Item>
                <Descriptions.Item label="Soyad">Jesus</Descriptions.Item>
                <Descriptions.Item label="Doğum Tarihi">19/09/1998</Descriptions.Item>
                <Descriptions.Item label="Wallet ID">0xABCDEF123456</Descriptions.Item>
              </Descriptions>
              </div>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white"}} className="site-layout-background">AppName ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ProfilePage;