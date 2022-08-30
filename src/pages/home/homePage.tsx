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
import { useHref } from "react-router-dom";


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



const Role = {
	Admin: 0,
	Parent: 1,
	Child: 2,
	Unregistered: 3
}

const smoothScroll = function(target:any) {
  var scrollContainer = target;
  do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      let toAdd = 750;

      targetY += target.offsetTop - toAdd;
  } while (target = target.offsetParent);

  const scroll = function(c:any, a:any, b:any, i:any) {
      i++; if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function(){ scroll(c, a, b, i); }, 5);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
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
      window.location.href="http://localhost:3000/profile";
      break;
    case Role.Child:
      window.location.href="http://localhost:3000/child-profile";
      break;
    case Role.Unregistered:
      window.location.href="http://localhost:3000/signin";
        break;
    default:
      // code block
  }

}

function getHakkimizda() {
  window.location.href='http://localhost:3000/#hakkimizda-text'
}
function getIletisim() {
  window.location.href='http://localhost:3000/#iletisim-text'
}
function getMetamask() {
  window.location.href='http://localhost:3000/#metamask-text'
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
                  
                  <Button className="hakkimizda-btn" type="text" style={{color:'#fff',position:'absolute', textAlign:'center', left:'25vw', top:'4.5vh',fontSize:'26px'}} onClick={getHakkimizda}>Hakkımızda</Button>
                  <Button type="text" style={{color:'rgb(219, 99, 205)',position:'absolute', textAlign:'center', left:'40vw', top:'4.5vh',fontSize:'26px'}} onClick={getIletisim}>İletişim</Button>
                  <Button type="text" style={{color:'#FF8C04',position:'absolute', textAlign:'center', left:'52vw', top:'4.5vh',fontSize:'26px'}} onClick={() => smoothScroll(document.getElementById('metamask-text'))}>Metamask Nedir?</Button>
                  <Button className='kayit' onClick={getProperPage} type="primary" style={{position:'absolute',color:"white", backgroundColor:"rgb(219, 99, 205)", borderRadius:5,left:'54vw',top:'57vh',borderColor:'purple',width:'300px',verticalAlign:'top' }} >Metamask İle Kayıt Ol →</Button>
                  <Button className='giris' onClick={getProperPage} type="primary" style={{position:'absolute',color:"white", backgroundColor:"black", borderRadius:5,left:'54vw',top:'64vh',borderColor:'black',width:'300px' }} >Metamask İle Giriş Yap →</Button>
                  
                  <div id='mock'>
                  <h2 style={{position:'absolute',top:'35vh',left:'51vw',fontSize:'40px',color:'#fff',textAlign:'center'}}>Kripto Varlık Mirasının<br /> En Kolay Yolu</h2>
                  
                  <img src={logo} style={{position:'absolute',top:'1vh',left:'-0.5vw'}}></img>
                  
                  <h2 style={{position:'absolute',top:'20.9vh',left:'1.14vw',fontSize:'36px'}}>BLOXIFY</h2>
                  
                  <img src={hero} style={{position:'absolute',top:'77.9vh',left:'48vw',width:'35%',height:'75%'}}></img>
                  <h2 style={{position:'absolute',top:'30.5vh',left:'21.8vw',fontSize:'18px',color:'#fff',textAlign:'center'}}>CÜZDANINI BAĞLA</h2>
                  <h4 style={{position:'absolute',top:'35.8vh',left:'22.4vw',fontSize:'14px',color:'#000',textAlign:'left'}}>Metamask ile kayıt ol <br /> butonuna tıklayarak<br /> cüzdanını Bloxify'a bağla.</h4>
                  <h2 style={{position:'absolute',top:'30.5vh',left:'38.6vw',fontSize:'18px',color:'#fff',textAlign:'center'}}>ÇOCUKLARIM</h2>
                  <h4 style={{position:'absolute',top:'35.8vh',left:'37.2vw',fontSize:'14px',color:'#000',textAlign:'left'}}>Çocuklarıma tıklayarak<br /> çocuğunun bilgilerini ekle.</h4>
                  <h2 style={{position:'absolute',top:'55.5vh',left:'30.6vw',fontSize:'18px',color:'#fff',textAlign:'center'}}>MİRASINI AKTAR</h2>
                  <h4 style={{position:'absolute',top:'60.8vh',left:'30.2vw',fontSize:'14px',color:'#000',textAlign:'left'}}>Düşük işlem ücretleri ile<br /> mirasını geri çek veya <br /> düzenle.</h4>
                  </div>
                  <div id="metamask-text">
                    <h2 style={{position:'absolute',top:'95.5vh',left:'21vw',fontSize:'36px',color:'#fff',textAlign:'center'}}>METAMASK NEDİR?</h2>
                    <h4 style={{position:'absolute',top:'103.8vh',left:'21vw',fontSize:'20px',color:'#fff',textAlign:'left',fontWeight:'lighter'}}>MetaMask Ethereum blok zinciri ile etkileşim kurmak<br /> için kullanılan bir kripto para cüzdanıdır.<br /> Kullanıcıların, daha sonra merkezi olmayan uygulamalarla<br /> etkileşim kurmak için kullanılabilecek bir tarayıcı eklentisi<br /> veya mobil uygulama aracılığıyla Ethereum cüzdanlarına<br /> erişmelerine olanak tanır.</h4>
                  </div>
                  
                  <div id="hakkimizda-text">
                    <h2 style={{position:'absolute',top:'164vh',left:'44vw',fontSize:'36px',color:'#fff',textAlign:'center'}}>Hakkımızda</h2>
                    <h4 style={{position:'absolute',top:'174vh',left:'27vw',fontSize:'20px',color:'#fff',textAlign:'left',fontWeight:'lighter'}}>Bloxify, ether kripto para birimini çocuklarınıza miras bırakmanız için güvenli bir yoldur.</h4>
                  </div>
                  
                  <div id="iletisim-text">
                    <h2 style={{position:'absolute',top:'182vh',left:'46.5vw',fontSize:'36px',color:'#fff',textAlign:'center'}}>İletişim</h2>
                    <LinkedinOutlined onClick={linkedinIcon} style={{position:'absolute',top:'193vh',left:'45vw',fontSize:'28px'}} />
                    <InstagramOutlined onClick={instagramIcon} style={{position:'absolute',top:'193vh',left:'48vw',fontSize:'28px'}} />
                    <TwitterOutlined onClick={twitterIcon} style={{position:'absolute',top:'193vh',left:'51vw',fontSize:'28px'}} />
                    <YoutubeOutlined onClick={youtubeIcon} style={{position:'absolute',top:'193vh',left:'54vw',fontSize:'28px'}} />
                    <h2 style={{position:'absolute',top:'200vh',left:'41vw',fontSize:'16px',color: '#DADADA'}}>user140@mydevopscld.onmicrosoft.com</h2>
                  </div>
                  
                  
                </div>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </div>
  );
};
export default HomePage;
