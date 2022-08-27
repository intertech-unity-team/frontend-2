import React, { useState } from "react";
import './style.css';
import { Button, DatePicker, Form, Input, Layout, Menu, MenuProps, Avatar, Card } from 'antd';
import backgroundImg from '../../assets/img/lol.png';
import logo from '../../assets/img/logo.png'
import { TeamOutlined , UserOutlined, SolutionOutlined, WarningFilled, EditFilled, EditOutlined, EditTwoTone } from '@ant-design/icons';
import { PATENT_ADDRESS, PATENT_ABI } from "../../constants/MyProject";
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
let screenWidth = window.screen.width;
type MenuItem = Required<MenuProps>['items'][number];
let avatarSize = 100;

function getChildAddPage() {
    window.location.href='http://localhost:3000/child-add';
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

  async function getParentInfo() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);
  
    // Parent hesabını seçip sonra aşağıyı çalıştırın
  
    const getP = await contract.getParent();
    return getP;
  }

const ChildViewerPage: React.FC = () => {

  const [childrenObjectsArray, setChildrenObjectsArray] = useState<Array<string>[]>([]);  
  const [childrenNamesStateArray, setChildrenNamesArray] = useState<string[]>([]);  
  const navigate = useNavigate();

  let childrenNamesArray: string [] = [];
  

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);



  let parentInfoPromise = getParentInfo().then(
    async function(result){

      const getChildren = await contract.get_Children_Of_Parent(result[2]);
      // getChild is an array which includes the children of the current parent

      // add all children to array and display it
      setChildrenObjectsArray(getChildren);
      getChildren.forEach((childArr: never[]) => {
        let childName = childArr[0];

        childrenNamesArray.push(childName);
        
        
      });
      
    }
    
  ).then(function setChildrenNames(){
    setChildrenNamesArray(childrenNamesArray);

  });
  

  let avatarArray: React.ReactElement[] = [];
  let childrenNotFound = <div></div>;

  function AvatarCardOnClickHandler(childArr:Array<string>){
    let x = parseInt(childArr[3]);
    navigate('/child-update', { state: { name: childArr[0], surname: childArr[1], walletID: childArr[2], timestamp: x } } );

  };

  childrenObjectsArray.forEach(childArr => {
    if(childArr[2] != "0x0000000000000000000000000000000000000000"  ){
      avatarArray.push(
        <Card style={{textAlign:"center", backgroundColor:"transparent", borderColor:"transparent"}}
        onClick={()=>AvatarCardOnClickHandler(childArr)}>
          <EditOutlined style={{color:"rgb(178, 208, 209)", fontSize:"20px", marginLeft:"75%"}} />
          <br/>
          <Avatar size={avatarSize} style={{marginBottom:"10%"}} icon={<UserOutlined /> } />
          <br/>
          <text style={{color:"#DADADA"}}>{childArr[0]}</text>
      </Card>
      );
    }
      
  }

  );
  if (avatarArray.length == 0){
    childrenNotFound = <div style={{textAlign:"center"}}>
      <WarningFilled style={{fontSize:"100px", marginBottom:"10vh", color:"rgb(237, 17, 35)"}}/>
      <h1 style={{color:"snow"}}>Çocuk bulunamadı. Sağ üstteki çocuk ekle butonunu kullarak çocuklarınızı sisteme ekleyebilirsiniz.</h1>

    </div>;
  }

  
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

        <Content style={{ minHeight: 280, overflow: 'hidden'}}>
                      
          <div className="float-container">

              <div className='float-child-right' style={{minWidth: screenWidth / 7, overflow: 'hidden'}}>
                  <h1 style={{textAlign:"center", fontSize:"28px", overflow: 'hidden' , color:'#DADADA'}}>Çocuklarım</h1>
                  
              </div>
              <Button className="btn" onClick={getChildAddPage} shape="round">Cocuk Ekle +</Button>
          </div>
          <div className="mid-container" style={{display:"flex",justifyContent:"space-around", width:"50%"}}>
            {childrenNotFound}
            {avatarArray}
          </div>
        </Content>

      </Layout>
          </Content>

          <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>

      </Layout>
  );
      
    
};
  
export default ChildViewerPage;
