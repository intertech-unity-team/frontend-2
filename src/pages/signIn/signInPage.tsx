import './signInPage.css';
import { Layout, Menu, Form, Input, Button } from 'antd';
import React, { useState } from 'react';
import backgroundImg from '../../assets/img/kayit-ekran-background.png';
import metamaskLogo from '../../assets/img/metamask_logo.png';
import teamLogo from '../../assets/img/logo.png';
import { PATENT_ABI, PATENT_ADDRESS } from '../../constants/MyProject';
import { ethers } from 'ethers';



const { Header, Content } = Layout;

async function getParentPage(pName:string, pSurname:string, pWalletID: string) {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Parent hesabını seçip sonra aşağıyı çalıştırın

  const addP = await contract.addParent(pName,pSurname, pWalletID, "", 0);
  console.log(addP);

  // Owner rolündeyken aşağısı çalıştırılaablilir

  //const getAllP = await contract.get_All_Parents();
  //console.log(getAllP);

  window.location.href="http://localhost:3000/parent";
  
}


var walletID = "0xABCDEF";
const SignInPage: React.FC = () => {

  const [parentName, setParentName] = useState("");
  const [parentSurname, setParentSurname] = useState("");
  const [parentWalletID, setWalletID] = useState("");

  return(
    <Layout className="layout">
      
      <Content style={{ padding: '0 50px', backgroundImage:`url(${backgroundImg})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
         }}>
        <div className="site-layout-content" style={{padding:"14.5vh 30vw 0vh 30vw"}}>
          <div className='login-container'>
              <br/>
              <h1 style={{textAlign:"center", paddingBottom:"7.5vh", fontSize:"48px", color:'#DADADA'}}>KAYIT OL</h1>
              <Form layout='vertical' style={{width:"75%", marginLeft:"auto", marginRight:"auto"}}>
                  <Form.Item label="Adınız">
                      <Input placeholder="Adınızı giriniz"
                              onChange={e => setParentName(e.target.value)} />
                      </Form.Item>
                      <Form.Item label="Soyadınız">
                          <Input placeholder="Soyadınızı giriniz" 
                                onChange={e => setParentSurname(e.target.value)}/>
                      </Form.Item>
                      <Form.Item label="Wallet ID">
                          <Input disabled
                                 value={window.ethereum.selectedAddress}/>
                      </Form.Item>
                      <div style={{textAlign:"center"}}>
                      <Button
                        
                       onClick={() => getParentPage(parentName, parentSurname, window.ethereum.selectedAddress)} type="primary" className='btn-login' size='large' shape="round" style={{backgroundColor:"rgba(60, 60, 60, 1)"}}>Kaydol
                       </Button>
                      </div>
                  </Form>
                </div>
        </div>
      </Content>
    </Layout>
  );
};


export default SignInPage;