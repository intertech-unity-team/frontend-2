import React, { useState } from 'react';
import { HomeOutlined, UserOutlined, TeamOutlined, WarningOutlined,  SolutionOutlined, CheckOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Form, Input, InputNumber, MenuProps, Slider, Space } from 'antd';
import { Layout, Menu } from 'antd';
import { Table, Card, Button } from "antd";


// !!!
import "antd/dist/antd.css";
import "./parentWithdrawStyle.css";
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

async function sendButtonHandler (updateChildWalletID:string, formAmount:number) {
  if(formAmount == 0){
    return false;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  try{
    
    const sendMoney = await contract.parent_Withdraws_Money(updateChildWalletID , ethers.utils.parseEther(formAmount.toString()));
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
  const [updateChildBalance, setUpdateChildBalance] = useState("");

  const [childrenObjectsArray, setChildrenObjectsArray] = useState([]);
  const [childrenNamesArray, setChildrenNamesArray] = useState<string[]>([]);

  const [sendMoneyAmount, setSendAmount] = useState(0);
  

let childKey = 0;
const [childName, setChildName] = useState("");

// Dropdown menü ayarları
const handleMenuClick: MenuProps['onClick'] = e => {
    childKey = parseInt(e.key);
    setChildName(childrenNamesArray[childKey]);

    setUpdateChildNameInput(childrenObjectsArray[childKey][0]);
    setUpdateChildSurnameInput(childrenObjectsArray[childKey][1]);
    setUpdateChildWalletID(childrenObjectsArray[childKey][2]);
    setUpdateChildBalance(childrenObjectsArray[childKey][4]);

    let intVersion = 0;
    intVersion = parseInt(childrenObjectsArray[childKey][4]);
    intVersion /= 10**18;
    setUpdateChildBalance(intVersion.toString());
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
          description: "Para başarıyla çekildi",
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
          description: "Para çekilemedi. Lütfen doğru metamask hesabını seçtiğinizden veya doğru bir miktar (ETH) girdiğinizden emin olun.",
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
        <Content>
          <Layout>
            <Content>
              <div>
                <img src={backgroundImg} style={{width:'100%', position:'relative'}}></img>
                <h2 style={{position:'absolute',top:'19vh',left:'44vw',color:'#fff',fontSize:'36px'}}>Para Çek</h2>
                <h2 style={{position:'absolute',top:'30vh',left:'48vw',color:'#fff',fontSize:'18px'}}>Çocuk Seç</h2>
                <Form layout='vertical' className='input-xdlmao'>

                  <Form.Item style={{position:'absolute',top:'37vh',left:'48vw',width:'40%'}} label="Çocuk Adı">
                    <Input className='ilk-input' placeholder="Çocuk Adı" size='middle' style={{width: '31%'}} value={updateChildNameInput + " " + updateChildSurnameInput} disabled ></Input>
                  </Form.Item>

                  <Form.Item style={{position:'absolute',top:'48vh',left:'48vw',width:'40%'}} label="Çocuk Wallet ID">
                    <Input className='ilk-input' size='middle' style={{width: '31%'}}  value={updateChildWalletID} disabled></Input>
                  </Form.Item>

                  <Form.Item style={{position:'absolute',top:'58vh',left:'48vw',width:'40%'}} label="Çocuk Balance">
                    <Input className='ilk-input' size='middle' style={{width: '31%'}}  value={updateChildBalance} disabled></Input>
                  </Form.Item>
                  
                  <h2 style={{position:'absolute',top:'67vh',left:'48vw',color:'#fff',fontSize:'18px'}}>
                    Çekilecek Tutar
                  </h2>
                  <Form.Item style={{position:'absolute',top:'72vh',left:'48vw',width:'40%'}}
                  name="amount"
                  rules={[{ required: true, message: 'Lütfen Çekilecek Turarı girinz!' }]}>
                  <InputNumber className='ilk-input' size='middle' placeholder="Miktar..." min={0} defaultValue={0} onChange={handleSendMoneyInput} style={{width: '31%'}} />;
                  </Form.Item>
                </Form>
                <Context.Provider value={{ name: 'Ant Design' }}>
                  {contextHolder}
                  <Space>
                    <Button type='default' htmlType='submit' shape='round' onClick={
                      async () => {if(!await sendButtonHandler(updateChildWalletID, sendMoneyAmount )){
                        openNotification('topRight', false);
                      }
                      else{
                        openNotification('topRight', true);
                      }
                    }
                    } 
                      
                    style={{borderColor:'#fff',background:'transparent',color:'#fff',position:'absolute',top:'80vh',left:'49.2vw',width:'10vw'}}>PARA ÇEK</Button>
                    </Space>
                    </Context.Provider>
                
                <div style={{position:'absolute',top:'30vh',left:'54vw',backgroundColor:'#fff'}}>
                  <Dropdown overlay={menu}>
                        <Button
                        onMouseOver={childMenuUpdater}
                        >
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
                
                <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%",top:'145vh'}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
      
  
    );
};

export default ParentPanel;