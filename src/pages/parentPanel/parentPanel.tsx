import React, { useState } from 'react';
import { HomeOutlined, UserOutlined, TeamOutlined, WarningOutlined,  SolutionOutlined, CheckOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Form, Input, InputNumber, MenuProps, Row, Slider, Space } from 'antd';
import { Layout, Menu } from 'antd';
import { Table, Card, Button } from "antd";


// !!!
import "antd/dist/antd.css";
import "./parentPanel.css";
import logo from '../../assets/img/logo.png';
import ethLogo from '../../assets/img/eth_logo.png';
import backgroundImg from '../../assets/img/q.png';
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import { ethers } from 'ethers'; 
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import notification from 'antd/lib/notification';
import type { NotificationPlacement } from 'antd/es/notification';


const { Content, Footer, Sider } = Layout;


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


async function getParentInfo() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Parent hesabını seçip sonra aşağıyı çalıştırın

  const getP = await contract.getParent();
  return getP;
}

async function sendButtonHandler (updateChildWalletID:string, sendMoneyAmount:number) {
  if(sendMoneyAmount == 0){
    return false;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  try{
    const sendMoney = await contract.deposit_to_Child(updateChildWalletID , { value: ethers.utils.parseEther(sendMoneyAmount.toString())});
    console.log(sendMoney);
    return true;
  }
  catch{
    console.log("catched");
    return false;
  }

};



const Context = React.createContext({ name: 'Default' });

const ParentPanel = () => {

  const [updateChildNameInput, setUpdateChildNameInput] = useState("");
  const [updateChildSurnameInput, setUpdateChildSurnameInput] = useState("");
  const [updateChildWalletID, setUpdateChildWalletID] = useState("");

  const [childrenObjectsArray, setChildrenObjectsArray] = useState([]);
  const [childrenNamesArray, setChildrenNamesArray] = useState<string[]>([]);

  const [sendMoneyAmount, setSendAmount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

let childKey = 0;
const [childName, setChildName] = useState("");

window.addEventListener("resize", myFunc);

function myFunc(){
  setScreenWidth(window.innerWidth);
  setScreenHeight(window.innerHeight);
}

// Dropdown menü ayarları
const handleMenuClick: MenuProps['onClick'] = e => {
    childKey = parseInt(e.key);
    setChildName(childrenNamesArray[childKey]);

    setUpdateChildNameInput(childrenObjectsArray[childKey][0]);
    setUpdateChildSurnameInput(childrenObjectsArray[childKey][1]);
    setUpdateChildWalletID(childrenObjectsArray[childKey][2]);
  };

  function itemCreator(){
    let itemsArray: Array<ItemType>;
    itemsArray = [];
    let counter = 0;
    childrenNamesArray.forEach(element => {
      if(childrenObjectsArray[counter][2] != "0x0000000000000000000000000000000000000000"){
        itemsArray.push(
          {
            label: element,
            key: counter.toString(),
            icon: <UserOutlined />,
          }
        );
      }

      
      counter++;
    });
    return itemsArray;
  }

  // Dropdown menü itemleri
  const menu = (
      <Menu
        onClick={handleMenuClick}
        items={itemCreator()}
      />
    );

  // OnHover, childrenları çek
  async function childMenuUpdater(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);


  let parentInfoPromise = getParentInfo().then(
    async function(result){
      console.log(result);
      


      const getChildren = await contract.get_Children_Of_Parent(result[2]);
      // getChild is an array which includes the children of the current parent
      console.log(getChildren);

      let childrenArray: string[] = [];

      // add all children to array and display it
      getChildren.forEach((childArr: never[]) => {
        let childName = childArr[0] + " " + childArr[1];

        childrenArray.push(childName);
      });
      console.log(childrenArray);
      setChildrenNamesArray(childrenArray);
      setChildrenObjectsArray(getChildren);
      
    }
  );
}


    const handleSendMoneyInput = (value: number) => {
      console.log('changed', value);
      setSendAmount(value);
    };


    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, isitOK: boolean) => {
      if (isitOK){
        api.info({
          message: `İşlem Başarılı`,
          description: "Çocuğa başarıyla miras bırakıldı",
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
          description: "Çocuğa para gönderilemedi. Lütfen doğru metamask hesabını seçtiğinizden veya doğru bir miktar (ETH) girdiğinizden emin olun.",
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
      <Layout>
        <Sider className='sider' width={200} hidden={(screenWidth > 700 || screenWidth <= 0) ? false:true}>
          <img src={logo} alt="Logo" width="150%" height="20%"></img>
          <Menu
            defaultSelectedKeys={['']}
            defaultOpenKeys={['']}
            style={{background:"#2A2E30", width:"100.5%", color:"white"}}
            items={items}>
          </Menu>
        </Sider>
        <Content>
          <Card
          className='form-card'>
            <Form layout='vertical' className='form'>
              <h2 style={{color:"#DADADA", fontSize:"32px", marginBottom:"10%"}}>KRİPTO VARLIK GÖNDER</h2>
              <Form.Item label="Çocuk Seç"
              name="Select Child"
              rules={[{ required: true, message: 'Lütfen Gönderilecek Çocuğu Seçiniz!' }]}>
              <Dropdown className='dropdown'
              overlay={menu}>
                <Button
                onMouseOver={childMenuUpdater}
                >
                    <Space>
                    {childName}
                      <DownOutlined />
                    </Space>
                  </Button>
              </Dropdown>
              
              </Form.Item>

              <Form.Item label="Çocuk Adı">
                <Input className='ilk-input' placeholder="Çocuk Adı" size='middle' style={{width: '31%'}} value={updateChildNameInput + " " + updateChildSurnameInput} disabled ></Input>
              </Form.Item>

              <Form.Item label="Çocuk Wallet ID">
                <Input className='ilk-input' size='middle' style={{width: '31%'}}  value={updateChildWalletID} disabled></Input>
              </Form.Item>
              
              <Form.Item
              label='Gönderilecek Tutar'
              name="amount"
              rules={[{ required: true, message: 'Lütfen Gönderilecek Turarı girinz!' }]}>
              <InputNumber className='ilk-input' size='middle' placeholder="Miktar..." min={0} defaultValue={0} step={0.1} onChange={handleSendMoneyInput} style={{width: '31%'}} />
              </Form.Item>

            <Context.Provider value={{ name: 'Ant Design' }}>
              {contextHolder}
              <Space>
                <Button type='default' htmlType='submit' shape='round' className='btn' onClick={
                  async () => {if(!await sendButtonHandler(updateChildWalletID, sendMoneyAmount)){
                    openNotification('topRight', false);
                  }
                  else{
                    openNotification('topRight', true);
                  }
                }
                } 
                  
                >GÖNDER</Button>
                </Space>
                </Context.Provider>  
            </Form>       
          </Card>
        </Content>
        <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"fixed", bottom:0, width:"100%"}} hidden={(screenHeight > 600 || screenHeight <= 0) ? false:true}>BLOXIFY ©2022 Created by Team Unity</Footer>
      </Layout>
      
  
    );
};

export default ParentPanel;