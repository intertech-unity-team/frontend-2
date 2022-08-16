import React from 'react';
import { NotificationOutlined, UserOutlined, PaperClipOutlined, SendOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Form, Input, Button } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import { useState } from 'react';

// !!!
import "antd/dist/antd.css";
import "./profile.css";
import metamaskGif from '../../assets/images/metamask.gif';
import { addSyntheticLeadingComment } from 'typescript';

const { Header, Content, Footer, Sider } = Layout;
type LayoutType = Parameters<typeof Form>[0]['layout'];


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


const ProfilePage: React.FC = () => {

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
    <Layout className='layout'>
    <Content style={{ padding: '0 0px' }}>
      <Layout className="site-layout-background" style={{ padding: '0px 0' }}>
        <Sider style={{background:"#2A2E30"}} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['']}
            defaultOpenKeys={['']}
            style={{background:"#2A2E30", height:"72.2%", width:"100.5%"}}
            items={items2}>
            </Menu>
            <h1 style={{color: "snow", textAlign: 'center'}}>Bekleyen işlemler</h1>
            <img src={metamaskGif} alt="Metamask gif" width="100%" height="175"></img>
        </Sider>

        <Content style={{ padding: '0 0px', minHeight: 280}}>
            <div className='form-container'>
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}
                    onValuesChange={onFormLayoutChange}
                    >
                    
                    <Form.Item label="Ad">
                        <Input placeholder="Ad Giriniz" />
                    </Form.Item>
                    <Form.Item label="Soyad">
                        <Input placeholder="Soyad Giriniz" />
                    </Form.Item>
                    <Form.Item label="Doğum Tarihi">
                        <Input placeholder="Doğum Tarihinizi Giriniz" />
                    </Form.Item>
                    <Form.Item label="Wallet ID">
                        <Input placeholder="Wallet ID" />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button type="primary" className='center-the-button' size='large'>Güncelle</Button>
                    </Form.Item>
                </Form>
            </div>
        </Content>

      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white"}} className="site-layout-background">AppName ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ProfilePage;