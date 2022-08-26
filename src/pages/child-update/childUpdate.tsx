import React from 'react';
import { TeamOutlined , UserOutlined, SolutionOutlined, SendOutlined, DownOutlined } from '@ant-design/icons';
import { DatePicker, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Descriptions } from 'antd';
import { Form, Input, Button, Dropdown, Space } from "antd";
import { AlignType } from 'rc-table/lib/interface';
import { useState } from 'react';
import { ethers } from 'ethers';
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import { findTimeStampBtwTwoDates, findTimeStampBtwTwoDatesv2 } from '../../services/services';

// !!!
import "antd/dist/antd.css";
import './style.css';
import metamaskGif from '../../assets/images/metamask.gif';
import backgroundImg from '../../assets/img/lol.png';
import logo from '../../assets/img/logo.png'
import { addSyntheticLeadingComment, JsxElement } from 'typescript';
import moment from 'moment';
import dayjs from 'dayjs';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useLocation } from 'react-router-dom';



const { Content, Footer, Sider } = Layout;
const walletID = "0x1c80881894B2d90e163d844b91f82322B628a8Db";

type LayoutType = Parameters<typeof Form>[0]['layout'];


type MenuItem = Required<MenuProps>['items'][number];

// Çocuk isimleri burada


async function handleAddChildBtn(childName:string, childSurname:string, childWalletID:string, childBDay:string){
  // Find timestamp
  const timestamp = findTimeStampBtwTwoDates(childBDay, "01-01-1970");
  console.log(timestamp);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  //const getAllParents = await contract.get_All_Parents();
  //console.log(getAllParents);
  
  // Hangi parenta ekleyeceksen onu seçip sonra burayı çalıştır

  const addChild = await contract.addChild(childName, childSurname, childWalletID, timestamp, "", 0);
  console.log(addChild);

  // Owner rolündeki Account1 aşağıyı çalıştırabilir

  //const getAllC = await contract.get_All_Children();
  //console.log(getAllC);
  

  
}


async function handleUpdateChildBtn(newName:string, newSurname:string, childWalletID: string, newBDay:string){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Find timestamp
  const timestamp = findTimeStampBtwTwoDatesv2(newBDay, "01-01-1970");
  console.log(timestamp);

  const updateChild = await contract.update_Child_with_ID(newName, newSurname, childWalletID, timestamp, "", 0);

  console.log(updateChild);
  

}

async function handleDeleteChildBtn(childWalletID: string){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  const deleteChild = await contract.delete_Child_With_ID(childWalletID);

  console.log(deleteChild);


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

let screenWidth = window.screen.width;

interface CustomizedState {
    name: string,
    surname: string,
    walletID: string,
    timestamp: number
  }

const ChildUpdatePage: React.FC = () => {
    // State hooks for update child
    const [childName, setChildName] = useState("");
    const [childrenNamesArray, setChildrenNamesArray] = useState([]);

    const [updateChildNameInput, setUpdateChildNameInput] = useState("");
    const [updateChildSurnameInput, setUpdateChildSurnameInput] = useState("");
    const [updateChildWalletID, setUpdateChildWalletID] = useState("");
    const [updateChildBDay, setUpdateChildBDay] = useState("");


    const [childrenObjectsArray, setChildrenObjectsArray] = useState([]);

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


    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };
    
    


    // Dropdown menü ayarları
    const handleMenuClick: MenuProps['onClick'] = e => {
        

        /*
        childKey = parseInt(e.key);
        setChildName(childrenNamesArray[childKey]);

        setUpdateChildNameInput(childrenObjectsArray[childKey][0]);
        setUpdateChildSurnameInput(childrenObjectsArray[childKey][1]);
        setUpdateChildWalletID(childrenObjectsArray[childKey][2]);

        let bDate = dayjs.unix(childrenObjectsArray[childKey][3]).toDate();
        console.log(bDate.getDate());

        let birthYear = bDate.getFullYear() - 18;
        let bDayToDate = bDate.getDate() + "-" + (bDate.getMonth()+1) + "-" + birthYear;
        console.log(bDayToDate);
        dayjs(bDayToDate).format('DD/MM/YYYY');

        setUpdateChildBDay(bDayToDate.toString());
        */

      };


    return (
    <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`, backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%', overflow: 'hidden', position: 'fixed'}}>
      <Content style={{ padding: '0 0px' , overflow: 'hidden'}}>
        <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})` , backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%', overflow: 'hidden'}}>
          <Sider style={{background:"#2A2E30"}} width={200}>
          <img src={logo} alt="Logo" width="150%" height="25%"></img>
            <Menu
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{background:"#2A2E30", height:"71.2vh", width:"100.5%", color:"white"}}
              items={items}>
              </Menu>
          </Sider>

          <Content style={{ padding: '0 50px 0', minHeight: 280, overflow: 'hidden'}}>
                        
            <div className="float-container">
              
              <div className='float-child-right' style={{minWidth: screenWidth / 7}}>
                <h1 style={{textAlign:"center", fontSize:"28px", overflow: 'hidden' , color:'#DADADA'}}>Çocuk Bilgilerini Güncelle</h1>
                <br/>
                <Form layout='vertical'>
                  <Form.Item label="Çocuk Adı">
                    <Input placeholder={name} onChange={e => setUpdateChildNameInput(e.target.value)}  disabled={false}/>
                  </Form.Item>
                  <Form.Item label="Çocuk Soyadı">
                    <Input placeholder={surname} onChange={e => setUpdateChildSurnameInput(e.target.value)}  disabled={false}/>
                  </Form.Item>
                  <Form.Item label="Çocuğun Wallet ID'si">
                    <Input value={walletID} disabled/>
                  </Form.Item>
                  <Form.Item label="Çocuğun Doğum Tarihi">
                  <Input value={bDayToDate} disabled/>
                  </Form.Item>
                    <div style={{textAlign:"center"}}>
                      <Button type="primary" className='btn-update'
                      onClick={() => handleUpdateChildBtn(updateChildNameInput, updateChildSurnameInput, walletID, bDayToDate)}
                      >Çocuk Bilgilerini Güncelle</Button>
                      <Button
                      onClick={() => handleDeleteChildBtn(walletID)}
                       type="primary" danger className='btn-delete'>Çocuğu Sil</Button>
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

export default ChildUpdatePage;