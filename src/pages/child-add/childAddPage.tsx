import React from 'react';
import { TeamOutlined , UserOutlined, SolutionOutlined, SendOutlined, DownOutlined } from '@ant-design/icons';
import { DatePicker, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Descriptions } from 'antd';
import { Form, Input, Button, Dropdown, Space } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import { useState } from 'react';
import { ethers } from 'ethers';
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import { findTimeStampBtwTwoDates } from '../../services/services';

// !!!
import "antd/dist/antd.css";
import './parentPanelChild.css';
import metamaskGif from '../../assets/images/metamask.gif';
import backgroundImg from '../../assets/img/background-image.jpg';
import logo from '../../assets/img/logo.png'
import { addSyntheticLeadingComment } from 'typescript';
import moment from 'moment';

const { Content, Footer, Sider } = Layout;
const walletID = "0x1c80881894B2d90e163d844b91f82322B628a8Db";

type LayoutType = Parameters<typeof Form>[0]['layout'];

let childKey = 0;

type MenuItem = Required<MenuProps>['items'][number];

async function handleAddChildBtn(childName:string, childSurname:string, childWalletID:string, childBDay:string){
  // Find timestamp
  const timestamp = findTimeStampBtwTwoDates(childBDay, "01-01-1970");
  console.log(timestamp);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  const getAllParents = await contract.get_All_Parents();
  console.log(getAllParents);
  
  // Hangi parenta ekleyeceksen onu seçip sonra burayı çalıştır

  //const addChild = await contract.addChild(childName, childSurname, childWalletID, timestamp);
  //console.log(addChild);

  // Owner rolündeki Account1 aşağıyı çalıştırabilir

  //const getAllC = await contract.get_All_Children();
  //console.log(getAllC);
  
  
}

async function handleUpdateChildBtn(){
  // delete+ekle yapılabilir
}

async function handleDeleteChildBtn(){

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
      </a>, '5'),
  ]),
];

let screenWidth = window.screen.width;

const ParentPanelChildPage: React.FC = () => {
    // State hooks for update child
    const [childName, setChildName] = useState("");
    const [updateChildNameInput, setUpdateChildNameInput] = useState("");
    const [updateChildSurnameInput, setUpdateChildSurnameInput] = useState("");
    const [updateChildWalletID, setUpdateChildWalletID] = useState("");
    const [updateChildBDay, setUpdateChildBDay] = useState("");

    // State hooks for add child
    const [addChildNameInput, setAddChildNameInput] = useState("");
    const [addChildSurnameInput, setAddChildSurnameInput] = useState("");
    const [addChildWalletID, setAddChildWalletID] = useState("");
    const [createChildBDay, setCreateChildBDay] = useState("");

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
              <div className='float-child-left' style={{minWidth: screenWidth / 7}}>
                <h1 style={{textAlign:"center", fontSize:"28px"}}>Çocuk Bilgilerini Güncelle</h1>
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
                  <Form.Item label="Çocuk Adı">
                    <Input placeholder="İsim giriniz" onChange={e => setUpdateChildNameInput(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Çocuk Soyadı">
                    <Input placeholder="Soyad giriniz" onChange={e => setUpdateChildSurnameInput(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Çocuğun Wallet ID'si">
                    <Input placeholder="Wallet ID giriniz" onChange={e => setUpdateChildWalletID(e.target.value)}/>
                  </Form.Item>
                  <Form.Item label="Çocuğun Doğum Tarihi">
                    <DatePicker defaultValue={moment()} format={'DD/MM/YYYY'} onChange={(_, dateString) => setUpdateChildBDay(dateString)}/>
                  </Form.Item>
                    <div style={{textAlign:"center"}}>
                      <Button type="primary" className='btn-update'>Çocuk Bilgilerini Güncelle</Button>
                      <Button type="primary" danger className='btn-delete'>Çocuğu Sil</Button>
                    </div>
                </Form>
              </div>

              <div className='float-child-right' style={{minWidth: screenWidth / 7}}>
              <h1 style={{textAlign:"center", paddingBottom:"11.5vh", fontSize:"28px"}}>Yeni Çocuk Ekle</h1>
                <Form layout='vertical' >
                <Form.Item label="Çocuk İsmi">
                    <Input placeholder="İsim giriniz" onChange={e => setAddChildNameInput(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Çocuk Soyadı">
                    <Input placeholder="Soyad giriniz" onChange={e => setAddChildSurnameInput(e.target.value)}/>
                  </Form.Item>
                    <Form.Item label="Çocuğun Wallet ID'si">
                        <Input placeholder="Wallet ID giriniz" onChange={e => setAddChildWalletID(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Çocuğun Doğum Tarihi">
                      <DatePicker format={'DD/MM/YYYY'} onChange={(_, dateString) => setCreateChildBDay(dateString)}/>
                    </Form.Item>
                    <div style={{textAlign:"center"}}>
                      <Button type="primary"
                      className='btn-update'
                      onClick={() => handleAddChildBtn(addChildNameInput, addChildSurnameInput, addChildWalletID, createChildBDay)}
                      >Çocuk Ekle
                      </Button>
                    </div>
                
                    </Form>
                </div>
              </div>
          </Content>

        </Layout>
      </Content>
    <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">AppName ©2022 Created by Team Unity</Footer>
  </Layout>
    );
};

export default ParentPanelChildPage;