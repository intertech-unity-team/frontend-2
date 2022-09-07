import React from 'react';
import { TeamOutlined , UserOutlined, SolutionOutlined, CheckOutlined, WarningOutlined, HomeOutlined } from '@ant-design/icons';
import { Card, DatePicker, MenuProps, notification } from 'antd';
import { Breadcrumb, Layout, Menu, Descriptions } from 'antd';
import { Form, Input, Button, Dropdown, Space } from "antd";
import { useState } from 'react';
import { ethers } from 'ethers';
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import { findTimeStampBtwTwoDates, findTimeStampBtwTwoDatesv2 } from '../../services/services';

// !!!
import "antd/dist/antd.css";
import './style.css';
import backgroundImg from '../../assets/img/lol.png';
import logo from '../../assets/img/logo.png'
import moment from 'moment';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import type { NotificationPlacement } from 'antd/es/notification';


const { Content, Footer, Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

// Çocuk isimleri burada




async function handleUpdateChildBtn(newName:string, newSurname:string, childWalletID: string, newBDay:string){
  if(newName.trim() == "" || newSurname.trim() == ""){
    return false;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Find timestamp
  const timestamp = findTimeStampBtwTwoDatesv2(newBDay, "01-01-1970");
  console.log(timestamp);

  try{
    const updateChild = await contract.update_Child_with_ID(newName.trim(), newSurname.trim(), childWalletID, timestamp, "", 0);
    console.log(updateChild);
    return true;
  }
  catch{
    console.log("catched");
    return false;
  }
  
  

}

async function handleDeleteChildBtn(childWalletID: string){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);


  try{
    const deleteChild = await contract.delete_Child_With_ID(childWalletID);
    console.log(deleteChild);
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
      <a href="/parent-withdraw" rel="noopener noreferrer">
      Para Çek
      </a>, '5'),
  ]),
];

let screenWidth = window.screen.width;

interface CustomizedState {
    name: string,
    surname: string,
    walletID: string,
    timestamp: number
  }

const Context = React.createContext({ name: 'Default' });

const ChildUpdatePage: React.FC = () => {
    // State hooks for update child
    const [childName, setChildName] = useState("");
    const [childrenNamesArray, setChildrenNamesArray] = useState([]);

    const [updateChildNameInput, setUpdateChildNameInput] = useState("");
    const [updateChildSurnameInput, setUpdateChildSurnameInput] = useState("");
    const [updateChildWalletID, setUpdateChildWalletID] = useState("");
    const [updateChildBDay, setUpdateChildBDay] = useState("");


    const [childrenObjectsArray, setChildrenObjectsArray] = useState([]);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, isitOK: boolean, msg:string) => {
      if (isitOK){
        api.info({
          message: `İşlem Başarılı`,
          description: "Çocuk Başarıyla "+msg+"",
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
          message: `İşlem Başarısız Oldu`,
          description: "Çocuk "+msg+ ". Lütfen doğru metamask hesabını seçtiğinizden veya girilen cüzdan adresine sahip bir çocuğu daha önce eklemediğinizden emin olun.",
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



    const location = useLocation();
    const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
    const { name, surname, walletID, timestamp } = state;

    console.log(name, surname, walletID, timestamp);
    console.log(timestamp);

    let bDate = dayjs.unix(timestamp).toDate();
    console.log(bDate.getDate());

    let birthYear = bDate.getFullYear() - 18;
    let bDayToDate = bDate.getDate() + "-" + (bDate.getMonth()+1) + "-" + birthYear;
    console.log(bDayToDate);
    dayjs(bDayToDate).format('DD/MM/YYYY');

    return (
    <Layout className='layout' >
      
        <Layout className="site-layout-background" style={{ overflow: 'hidden'}}>
          <Sider style={{background:"#2A2E30"}} width={200}>
          <img src={logo} alt="Logo" width="145%" height="15%"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", height:"100vh", width:'100.5%', color:"white"}}
              items={items}>
              </Menu>
          </Sider>

          <Content style={{ padding: '0 50px 0', minHeight: 280, overflow: 'hidden'}}>
                        
              <Card className='child-update-card'>
                <h1 style={{textAlign:"center", fontSize:"32px", overflow: 'hidden' , color:'#DADADA'}}>ÇOCUK BİLGİLERİNİ GÜNCELLE</h1>
                <br/>
                <Form layout='vertical'>
                  <Form.Item label="Çocuk Adı"
                  name="name"
                  rules={[{ required: true, message: 'Lütfen Çocuk İçin Yeni Ad Giriniz!' }]}>
                    <Input defaultValue={name} onChange={e => setUpdateChildNameInput(e.target.value)}  disabled={false}/>
                  </Form.Item>
                  <Form.Item label="Çocuk Soyadı"
                  name="surname"
                  rules={[{ required: true, message: 'Lüften Çocuk İçin Yeni Soyad Giriniz!' }]}>
                    <Input defaultValue={surname} onChange={e => setUpdateChildSurnameInput(e.target.value)}  disabled={false}/>
                  </Form.Item>
                  <Form.Item label="Çocuğun Metamask Cüzdan Adresi">
                    <Input value={walletID} disabled/>
                  </Form.Item>
                  <Form.Item label="Çocuğun Doğum Tarihi">
                  <Input value={bDayToDate} disabled/>
                  </Form.Item>
                    
                  <span className='btn-container'>
                    <Context.Provider value={{ name: 'Ant Design' }}>
                        {contextHolder}
                        
                        <Space>

                      
                        <Button type="primary" className='btn-update' htmlType='submit'
                        size='large'
                        onClick={
                          async () => {if(!await handleUpdateChildBtn(updateChildNameInput, updateChildSurnameInput, walletID, bDayToDate)){
                            openNotification('topRight', false, "Güncellenemedi");
                          }
                          else{
                            openNotification('topRight', true, "Güncellendi");
                          }
                        }
                      
                        }
                        >Çocuk Bilgilerini Güncelle</Button>

                      </Space>
                      
                          <Space>

                        <Button
                        size='large'
                        onClick={
                          async () => {if(!await handleDeleteChildBtn(walletID)){
                            openNotification('topRight', false, "Sistemden Silinemedi");
                          }
                          else{
                            openNotification('topRight', true, "Silindi");
                          }
                        }
                        }
                        type="primary" danger className='btn-delete'>Çocuğu Sil
                        </Button>
                      

                      </Space>
                    </Context.Provider>
                  
                  </span>
                    
                </Form>
              </Card>
          </Content>

        </Layout>
        

    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ChildUpdatePage;