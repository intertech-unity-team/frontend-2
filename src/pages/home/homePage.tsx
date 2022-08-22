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

function getLoginPage() {
  window.location.href="http://localhost:3000/login"
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
                <Button className='kayit' onClick={getLoginPage} type="primary" style={{color:"white", fontSize:17, backgroundColor:"orange", borderRadius:5, paddingBlockEnd:32, bottom:570, left:"63%" }} >Metamask İle Kayıt Ol →</Button> <h1></h1>
                <Button className='giris' type="primary" style={{color:"white", fontSize:17, backgroundColor:"black", borderRadius:5, paddingBlockEnd:32, bottom:570, left:"63%" }} >Metamask İle Giriş Yap →</Button></div> 
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
