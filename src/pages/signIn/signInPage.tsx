import './signInPage.css';
import { Layout, Menu, Form, Input, Button, InputNumber, notification, Space } from 'antd';
import React, { useState } from 'react';
import backgroundImg from '../../assets/img/kayit-ekran-background.png';
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import { ethers } from 'ethers';
import { CheckOutlined, WarningOutlined } from '@ant-design/icons';
import type { NotificationPlacement } from 'antd/es/notification';
import SkeletonInput from 'antd/lib/skeleton/Input';


const { Header, Content } = Layout;

async function getParentPage(pName:string, pSurname:string, pWalletID: string,pEmail: string,pPhoneNum: string) {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Parent hesabını seçip sonra aşağıyı çalıştırın

  try{
    let result = parseInt(pPhoneNum);
    const addP = await contract.addParent(pName,pSurname, pWalletID, pEmail, result);
    console.log(addP);
    return true;
  }
  catch{
    console.log("catched");
    return false;
  }
  
  
}

const Context = React.createContext({ name: 'Default' });

const SignInPage: React.FC = () => {

  const [parentName, setParentName] = useState("");
  const [parentSurname, setParentSurname] = useState("");
  const [parentWalletID, setWalletID] = useState("");
  const [parentEmail, setEmail] = useState("");
  const [parentPhoneNumber, setPhoneNumber] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement, isitOK: boolean) => {
    if (isitOK){
      api.info({
        message: `İşlem Başarılı`,
        description: "Kayıt işlemi başarıyla tamamlandı. Az sonra profilinize yönlendirileceksiniz.",
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
        description: "Kayıt işlemi başarısız oldu. Lütfen halihazırda seçili olan Metamask hesabınızı ve girdiğiniz bilgileri kontrol edin ve yeniden deneyin.",
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

  function delay(time:number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  return(
    <Layout className="layout">
      
      <Content style={{ padding: '0 50px', backgroundImage:`url(${backgroundImg})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
         }}>
        <div className="site-layout-content">
          <h1 style={{textAlign:"center", paddingTop:"8vh", fontSize:"48px", color:'#DADADA'}}>KAYIT OL</h1>
          
              
              <Form layout='vertical' style={{paddingTop:'6.8vh',width:"20%", marginLeft:"auto", marginRight:"auto"}}>
                <Form.Item label="Metamask Cüzdan Adresiniz">
                    <Input disabled
                            value={window.ethereum.selectedAddress}/>
                </Form.Item>
                <Form.Item label="Adınız"
                name="Adiniz"
                rules={[{ required: true, message: 'Lütfen Adınızı Giriniz!' }]}>
                    <Input placeholder="Adınızı giriniz"
                            onChange={e => setParentName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Soyadınız"
                name="Soyadiniz"
                  rules={[{ required: true, message: 'Lütfen Soyadınızı Giriniz!' }]}>
                    <Input placeholder="Soyadınızı giriniz" 
                          onChange={e => setParentSurname(e.target.value)}/>
                </Form.Item>
                <Form.Item label="E-posta Adresi"
                name="e-mail"
                  rules={[{ required: true, message: 'Lütfen E-posta Adresinizi Giriniz!' }]}>
                <Input placeholder="E-posta Adresinizi Giriniz"
                        onChange={e => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                name="Telno"
                label="Telefon Numarası"
                rules={[{ required: true, message: 'Lütfen Telefonunuzu Giriniz!' }]}
                >
                <Input placeholder="Telefon Numaranızı Giriniz"
                        onChange={e => setPhoneNumber(e.target.value)} />
                </Form.Item>
                      

                      <Form.Item style={{textAlign:"center"}}>
                        <Context.Provider value={{ name: 'Ant Design' }}>
                            {contextHolder}
                            <Space>
                              <Button
                              htmlType="submit"
                              onClick={
                                async () => {
                                  if(!await getParentPage(parentName, parentSurname, window.ethereum.selectedAddress,parentEmail,parentPhoneNumber)){
                                    openNotification('topRight', false);

                                }
                                else{
                                  openNotification('topRight', true);
                                  
                                  delay(5000).then(() =>window.location.href="http://localhost:3000/profile");
                                }
                              }
                              } type="primary" className='btn-login' size='large' shape="round" style={{borderColor:'rgba(60, 60, 60, 1)',backgroundColor:"rgba(60, 60, 60, 1)"}}>Kaydol
                              </Button>
                              </Space>
                        </Context.Provider>
                        </Form.Item>

                  </Form>
                
        </div>
      </Content>
    </Layout>
  );
};


export default SignInPage;