import React, { useState } from 'react';
import { UserOutlined, MenuFoldOutlined, CheckOutlined, WarningOutlined, HomeOutlined } from '@ant-design/icons';
import { Form, MenuProps, notification, Space } from 'antd';
import { Layout, Menu } from 'antd';
import { Button, Input, InputNumber } from "antd";


// !!!
import "antd/dist/antd.css";
import "./child.css";
import logo from '../../assets/img/logo.png';
import backgroundImg from '../../assets/img/kekw.png';
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import type { NotificationPlacement } from 'antd/es/notification';



import { ethers } from 'ethers';

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
    <a href="/" rel="noopener noreferrer" style={{color:"white"}}>
    Anasayfa
    </a>, '0', <HomeOutlined />),
  getItem(
    <a href="/child" rel="noopener noreferrer" style={{color:"white"}}>
    İşlemler
    </a>, '2', <MenuFoldOutlined />),
  getItem(
    <a href="/child-profile" rel="noopener noreferrer" style={{color:"white"}}>
      Profil
    </a>
    , '1', <UserOutlined />), 
];


async function getChildInfo() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Parent hesabını seçip sonra aşağıyı çalıştırın

  const getC = await contract.getChild();
  return getC;
}

async function withdrawMoneyHandler(formAmount:number){
  if(formAmount <= 0){
    return false;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  const getC = await contract.getChild();

  let walletID = getC[2];
  let releaseTime = parseInt(getC[3]);
  let walletBalance = parseInt(getC[4]);

  
  console.log(walletID, releaseTime, walletBalance);
  console.log(formAmount.toString());

  try{
    const childWithdraw = await contract.child_Withdraws_Money(walletID, ethers.utils.parseEther(formAmount.toString()), releaseTime);
    console.log(childWithdraw);
    return true;
  }
  catch{
    console.log("catched");
    
    return false;
  }

}

const openNotification = (isitOK:boolean) => {
  if(isitOK){
    notification.open({
      message: `İşlem Başarılı`,
      description: "Para çekme işleminiz başarıyla tamamlandı.",
      style: {  color: 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid #b7eb8f',
                  backgroundColor: '#f6ffed',
                  borderRadius: '30px'
                },
      icon: <CheckOutlined style={{color:"green"}}/>
    });
  }
  else{
    notification.open({
      message: `İşlem Başarısız Oldu`,
      description: "Para çekme işlemi başarısız oldu. Lütfen halihazırda seçili olan Metamask hesabınızı kontrol edin ve yeniden deneyin.",
      style: {  color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #ffa39e',
      backgroundColor: '#fff1f0',
      borderRadius: '30px'
    },
      icon: <WarningOutlined style={{color: "red"}}/> 
    });
  }
  
};

const Context = React.createContext({ name: 'Default' });

const ChildPage = () => {

  const [cName, setCName] = useState('');
  const [cSurname, setCSurname] = useState('');
  const [cWalletID, setCWalletID] = useState('');
  const [cWalletAmount, setCWalletAmount] = useState('');

  const [cWithdrawAmount, setWithdrawAmount] = useState(0);
  const [api, contextHolder] = notification.useNotification();

  try{
    let childInfoPromise = getChildInfo().then(
      function(result){
        setCName(result[0]);
        setCSurname(result[1]);
        setCWalletID(result[2]);
        
        let intVersion = 0;
        intVersion = parseInt(result[4]);
        intVersion /= 10**18;
        setCWalletAmount(intVersion.toString());
      }
    );
  }
  catch{
    openNotification(false);
  }

  const handleWithdrawMoneyInput = (value: number) => {
    console.log('changed', value);
    setWithdrawAmount(value);
  };

    return (
      <Layout>
        <Content >
          <Layout >
            <Sider style={{background:"#2A2E30"}} width={200}>
            <img src={logo} alt="Logo" width="150%" height="200px"></img>
              <Menu
                defaultSelectedKeys={['']}
                defaultOpenKeys={['']}
                style={{background:"#2A2E30", height:"71.2vh", width:"100.5%", color:"white"}}
                items={items}>
              </Menu>
            </Sider>
            <Content>
              <img src={backgroundImg} style={{width:'100%', position:'relative'}}></img>
              <h2 className='main-text' style={{position:'absolute',top:'11.5vh',left:'47vw',fontSize:'36px'}}>KRİPTO VARLIK ÇEK</h2>
              <div style={{position:'absolute',top:'25vh',left:'48.5vw',fontSize:'36px'}}>
                <Form layout='vertical' style={{paddingTop:'6.8vh', marginLeft:"auto", marginRight:"auto"}}>
                    <Form.Item label="Kullanılabilir Bakiye">
                        <InputNumber style={{width:'140%'}} disabled value={cWalletAmount} placeholder="Bakiye"
                                />
                        </Form.Item>
                        <br />
                        <br />
                        <Form.Item label="Çekmek İstenilen Miktar"
                        name="amount"
                        rules={[{ required: true, message: 'Lütfen Çekmek İstediğiniz Miktarı Giriniz!' }]}>
                            <InputNumber min={0} defaultValue={0} max={parseFloat(cWalletAmount)} step={0.1} onChange={handleWithdrawMoneyInput} style={{width:'140%'}} placeholder="Miktar Giriniz" 
                                  />
                        </Form.Item>
                        <div style={{textAlign:"center"}}>

                        <Context.Provider value={{ name: 'Ant Design' }}>
                          {contextHolder}
                          <Space>
                            <Button 
                            shape='round' style={{marginTop:'2vh',borderColor:'#fff',marginLeft:'5vw', background:'transparent', color:'#fff'}}  onClick={
                              async () => {if(!await withdrawMoneyHandler(cWithdrawAmount)){
                                openNotification(false);
                              }
                              else{
                                openNotification(true);
                              }
                            }
                            }
                            htmlType='submit'
                            >Çek
                            </Button>
                        </Space>
                      </Context.Provider>

                        </div>
                  </Form>
                </div>
            </Content>

          </Layout>
        </Content>
      <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>
    </Layout>
  
    );
};

export default ChildPage;