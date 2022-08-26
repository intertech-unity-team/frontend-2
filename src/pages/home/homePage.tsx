import "./home.css";
import backgroundImg from '../../assets/img/mf.png';
import { Header, Content } from "antd/lib/layout/layout";
import logo from '../../assets/img/logo.png'
import meta from '../../assets/img/metamask_logo.png'
import hero from '../../assets/img/hero_black.png'
import { Button, Layout, Space } from 'antd';
import { AndroidOutlined, AppleOutlined, GithubOutlined, InstagramOutlined, LinkedinOutlined, RedditOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import connectButtonOnClick from "../../components/metamask-auth";
import { ethers } from "ethers";
import { PATENT_ABI, PATENT_ADDRESS } from "../../constants/MyProject";
import { accountCheck } from "../../components/metamask-auth";


export const createMetamaskConnection = async () => {
  window.location.href="http://localhost:3000/signin";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  //const walletIDFounder = await provider.send("eth_requestAccounts", []);

  //console.log(walletIDFounder[0]);

  //const signer = provider.getSigner();
  //const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);
  
  //const deneme = await contract.addChild("ayşe","öztürk", "0xE086BE6D51137948c7E1F45a4994BC041a711E56", 10000);

  //console.log(deneme);
  //return await walletIDFounder[0].toString();

}

function linkedinIcon() {
  window.open("https://www.linkedin.com/company/intertech-information-technology-and-marketing-inc-/mycompany/verification/")
}

function instagramIcon() {
  window.open("https://www.instagram.com/intertechteyasam/")
}

function twitterIcon() {
  window.open("https://twitter.com/intertechIT")
}

function youtubeIcon() {
  window.open("https://www.youtube.com/channel/UCXC8pcaXM5cSatFeqYbzxlg/featured")
}

function getSignInPage() {
  accountCheck();
  createMetamaskConnection();

}

const Role = {
	Admin: 0,
	Parent: 1,
	Child: 2,
	Unregistered: 3
}

const getProperPage = async () => {
  accountCheck();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  let walletID = window.ethereum.selectedAddress;
  console.log(walletID);

  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  const getRole = await contract.getRole(walletID);

  console.log(getRole == Role.Parent);

  switch(getRole) {
    case Role.Admin:
      window.location.href="http://localhost:3000/admin";
      break;
    case Role.Parent:
      window.location.href="http://localhost:3000/parent";
      break;
    case Role.Child:
      window.location.href="http://localhost:3000/child";
      break;
    case Role.Unregistered:
      window.location.href="http://localhost:3000/signin";
        break;
    default:
      // code block
  }

}


const HomePage = () => {

  return ( 
      <div className="main-container">
        <Layout>
          <Content>
            <Layout>
              <Content>
                <div>
                  <img src={backgroundImg} style={{width:'100%', position:'relative'}}></img>
                  <img src={meta} style={{position:'absolute', width:'5%',height: '10%', top:'3.5vh', left: '72vw'}}></img>                  
                  <Button className="hakkimizda-btn" type="text" style={{color:'#fff',position:'absolute', textAlign:'center', left:'25vw', top:'4.5vh',fontSize:'26px'}} >Hakkımızda</Button>
                  <Button type="text" style={{color:'#fff',position:'absolute', textAlign:'center', left:'40vw', top:'4.5vh',fontSize:'26px'}}>İletişim</Button>
                  <Button type="text" style={{color:'#fff',position:'absolute', textAlign:'center', left:'52vw', top:'4.5vh',fontSize:'26px'}}>Metamask Nedir?</Button>
                  <Button className='kayit' type="primary" style={{position:'absolute',color:"white", backgroundColor:"purple", borderRadius:5,left:'54vw',top:'57vh',borderColor:'purple',width:'300px',verticalAlign:'top' }} >Metamask İle Kayıt Ol →</Button>
                  <Button className='giris' type="primary" style={{position:'absolute',color:"white", backgroundColor:"black", borderRadius:5,left:'54vw',top:'64vh',borderColor:'black',width:'300px' }} >Metamask İle Giriş Yap →</Button>
                  <h2 style={{position:'absolute',top:'35vh',left:'51vw',fontSize:'40px',color:'#fff',textAlign:'center'}}>Kripto Varlık Mirasının<br /> En Kolay Yolu</h2>
                  <img src={logo} style={{position:'absolute',top:'1vh',left:'-0.5vw'}}></img>
                  <h2 style={{position:'absolute',top:'20.9vh',left:'1.14vw',fontSize:'36px'}}>BLOXIFY</h2>
                </div>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </div>
  );
};
export default HomePage;
