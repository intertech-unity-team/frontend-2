import "./home.css";
import backgroundImg from '../../assets/img/background-image.jpg';
import { Header, Content } from "antd/lib/layout/layout";
import logo from '../../assets/img/logo.png'
import meta from '../../assets/images/metamask.gif'
import arkaplan2 from '../../assets/img/f8f1df.png'
import hero from '../../assets/img/hero_black.png'
import { Button, Layout, Space } from 'antd';
import { AndroidOutlined, AppleOutlined, GithubOutlined, InstagramOutlined, LinkedinOutlined, RedditOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import connectButtonOnClick from "../../components/metamask-auth";
import { ethers } from "ethers";
import { PATENT_ABI, PATENT_ADDRESS } from "../../constants/MyProject";


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
  createMetamaskConnection();

}

const Role = {
	Admin: 0,
	Parent: 1,
	Child: 2,
	Unregistered: 3
}

const getProperPage = async () => {
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
      <div>
          <Header className='baslik' style= {{background: "#2A2E30", width:"100%"}}>  
          
      <div><img className='logo' src={logo} alt="Logo" width="80px" height="70px"></img></div>

          <Button className='hakkimizda' style={{color:"white", fontSize:20, top:10, marginLeft:"5vw"}} type="text">Hakkımızda </Button>
          <Button className='iletisim' style={{color:"white", fontSize:20, top:10}} type="text">İletişim</Button>
          <Button className='metamask' style={{color:"white", fontSize:20, top:10}} type="text">Metamask Nedir?</Button>
            </Header> 
            <Content >
              <div >
                 <img className="arkaplan" src={backgroundImg} style={{width:"100%"}} />
              <text className="yazi"  style={{color:"black", fontSize:35, bottom: 600, left:1200}}>Kripto Varlık Mirasının<h6></h6> En Kolay Yolu</text><br/>
                <Button className='kayit' onClick={getSignInPage} type="primary" style={{color:"white", fontSize:17, backgroundColor:"orange", borderRadius:5, paddingBlockEnd:32, bottom:570, left:"63%" }} >Metamask İle Kayıt Ol →</Button> <h1></h1>
                <Button className='giris' onClick={getProperPage} type="primary" style={{color:"white", fontSize:17, backgroundColor:"black", borderRadius:5, paddingBlockEnd:32, bottom:560, left:"63%" }} >Metamask İle Giriş Yap →</Button></div> 
                <img className="arkaplan2" style={{bottom:225, width:"100%"}} src={arkaplan2}/> 
                <text className="yazi2" style={{bottom:1020, left:"13%"}}><h3> METAMASK NEDİR?</h3> Buy, store, send and swap tokens<br/>
                Available as a<br/>browser extension and as a mobile app,<br/> MetaMask equips you with a<br/> key vault, secure login, token wallet, and<br/>
                token exchange—everything you need to<br/> manage your digital assets.<br/><br/> https://metamask.io/about/</text><br/>
                <img className="hero" style={{bottom:1470, left:"53%"}} src={hero}/> 
                <text className="yazi3" style={{bottom:1400, textAlign:"center"}} ><h2>Hakkımızda</h2> </text> 
                <text className="yazi4" style={{bottom:1350, textAlign:"center"}}> <h4>2023 yılında Kurtköy/Pendik’te kurulan girişimci topluluğu.</h4></text><br/><br/><br/><br/>
                <text className="yazi5" style={{bottom:1300, textAlign:"center"}} ><h2>İletişim</h2> </text> 
                <div className="icons" style={{bottom:1200, left:"25%", fontSize:30, display:"flex", justifyContent:"space-around", width:"50%"}}
                    ><AppleOutlined /><AndroidOutlined /> <GithubOutlined /><TwitterOutlined /><YoutubeOutlined /><LinkedinOutlined /><InstagramOutlined /><RedditOutlined /></div>
            </Content>
          </div>
  );
};
export default HomePage;
