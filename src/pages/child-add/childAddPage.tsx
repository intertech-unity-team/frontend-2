import React from 'react';
import { TeamOutlined , UserOutlined, SolutionOutlined, WarningOutlined, CheckOutlined, HomeOutlined } from '@ant-design/icons';
import { Card, DatePicker, MenuProps } from 'antd';
import {  Layout, Menu } from 'antd';
import { Form, Input, Button, Dropdown, Space } from "antd";
import { useState } from 'react';
import { ethers } from 'ethers';
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import { findTimeStampBtwTwoDates, findTimeStampBtwTwoDatesv2 } from '../../services/services';

// !!!
import "antd/dist/antd.css";
import './parentPanelChild.css';
import backgroundImg from '../../assets/img/lol.png';
import logo from '../../assets/img/logo.png'

import notification from 'antd/lib/notification';
import type { NotificationPlacement } from 'antd/es/notification';

const { Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];


async function handleAddChildBtn(childName:string, childSurname:string, childWalletID:string, childBDay:string){
  // Find timestamp
  const timestamp = findTimeStampBtwTwoDates(childBDay, "01-01-1970");
  console.log(timestamp);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  
  try{
    const addChild = await contract.addChild(childName, childSurname, childWalletID, timestamp, "", 0);
    console.log(addChild);
    return true;
  }
    
  catch{
    console.log("catched");
    return false;
  }
    
  
}

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
    <a href="/" rel="noopener noreferrer" style={{color:"white"}}>
      Anasayfa
    </a>
    , '0', <HomeOutlined />),
  getItem(
    <a href="/profile" rel="noopener noreferrer" style={{color:"white"}}>
      Profil
    </a>
    , '1', <UserOutlined />),
  getItem(
      <a href="/child-view" rel="noopener noreferrer" style={{color:"white"}}>
      ??ocuklar
      </a>, '2', <TeamOutlined />),
  getItem(
      <a href="/parent" rel="noopener noreferrer" style={{color:"white"}}>
      ????lemler
      </a>
    , 'sub1', <SolutionOutlined />, [
    getItem(
      <a href="/parent" rel="noopener noreferrer">
      Kripto Varl??k G??nder
      </a>, '3'),
    getItem(
      <a href="/parent-withdraw" rel="noopener noreferrer">
      Para ??ek
      </a>, '5'),
  ]),
];

let screenWidth = window.screen.width;

const Context = React.createContext({ name: 'Default' });

const ParentPanelChildPage: React.FC = () => {
    // State hooks for add child
    const [addChildNameInput, setAddChildNameInput] = useState("");
    const [addChildSurnameInput, setAddChildSurnameInput] = useState("");
    const [addChildWalletID, setAddChildWalletID] = useState("");
    const [createChildBDay, setCreateChildBDay] = useState("");


    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, isitOK: boolean) => {
      if (isitOK){
        api.info({
          message: `????lem Ba??ar??l??`,
          description: "??ocuk Ba??ar??yla Eklendi",
          placement,
          style: {  color: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid #b7eb8f',
                    backgroundColor: '#f6ffed',
                    borderRadius: '30px'
                  },
          icon: <CheckOutlined style={{color:"green"}}/>
        });
      }
      else{
        api.info({
          message: `????lem Ba??ar??s??z Oldu`,
          description: "??ocuk Eklenemedi. L??tfen do??ru metamask hesab??n?? se??ti??inizden veya girilen c??zdan adresine sahip bir ??ocu??u daha ??nce eklemedi??inizden emin olun.",
          placement,
          style: {  color: 'rgba(0, 0, 0, 0.65)',
                    border: '1px solid #ffa39e',
                    backgroundColor: '#fff1f0',
                    borderRadius: '30px'
                  },
          icon: <WarningOutlined style={{color: "red"}}/>
        });
      }

    }
      

    return (
    <Layout className='layout'>
      <Content style={{overflow: 'hidden'}}>
        <Layout className="site-layout-background" >
          <Sider style={{background:"#2A2E30",minHeight: "100vh"}} width={200}>
          <img src={logo} alt="Logo" width="150%" height="20%"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", height:"71.2vh", width:"100.5%", color:"white"}}
              items={items}>
              </Menu>
          </Sider>

          <Content style={{ padding: '0 50px 0', minHeight: 280, overflow: 'hidden'}}>

            <Card className='form-card'>
                <h1 className='header'>YEN?? ??OCUK EKLE</h1>
                  <Form layout='vertical' >
                  <Form.Item label="??ocuk ??smi"
                  name="username"
                  rules={[{ required: true, message: 'L??tfen ??ocu??un ??smini Giriniz!' }]}>
                      <Input placeholder="??sim giriniz" onChange={e => setAddChildNameInput(e.target.value)}/>
                      </Form.Item>
                      <Form.Item label="??ocuk Soyad??" 
                      name="surname"
                      rules={[{ required: true, message: 'L??tfen ??ocu??un Soyad??n?? Giriniz!' }]}>
                      <Input placeholder="Soyad giriniz" onChange={e => setAddChildSurnameInput(e.target.value)}/>
                    </Form.Item>
                      <Form.Item label="??ocu??un C??zdan Adresi"
                      name="address"
                      rules={[{ required: true, message: 'L??tfen ??ocu??un Metamask C??zdan Adresini Giriniz!' }]}
                      >
                          <Input placeholder="C??zdan Adresi giriniz" onChange={e => setAddChildWalletID(e.target.value)}/>
                      </Form.Item>
                      <Form.Item label="??ocu??un Do??um Tarihi" style={{textAlign:"center"}}
                      name="bDay"
                      rules={[{ required: true, message: 'L??tfen ??ocu??un Do??um Tarihini Se??iniz!' }]}>
                        <DatePicker format={'DD/MM/YYYY'} onChange={(_, dateString) => setCreateChildBDay(dateString)} placeholder="Tarih Se??iniz" style={{width:"50%"}}/>
                      </Form.Item>
                      <div style={{textAlign:"center"}}>
                      <Context.Provider value={{ name: 'Ant Design' }}>
                        {contextHolder}
                        <Space>
                        <Button type="default"
                        htmlType='submit'
                        size='large'
                        className='btn-update'
                        style={{backgroundColor:"green", borderColor:"green", color:"snow"}}
                        onClick={async () => {if(!await handleAddChildBtn(addChildNameInput, addChildSurnameInput, addChildWalletID, createChildBDay)){
                                                openNotification('topRight', false);
                                              }
                                              else{
                                                openNotification('topRight', true);
                                              }
                                            }
                                          }
                        >??ocuk Ekle
                        </Button>

                      </Space>
                    </Context.Provider>
                    </div>
                
                    </Form>
                </Card>     
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ??2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ParentPanelChildPage;