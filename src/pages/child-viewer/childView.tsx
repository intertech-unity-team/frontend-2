import React, { useState } from "react";
import './style.css';
import { Button, DatePicker, Form, Input, Layout, Menu, MenuProps, Avatar, Card } from 'antd';
import backgroundImg from '../../assets/img/lol.png';
import logo from '../../assets/img/logo.png'
import { TeamOutlined , UserOutlined, SolutionOutlined, WarningFilled, HomeOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
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
  let contentToRender = <div></div>;

  function AvatarCardOnClickHandler(childArr:Array<string>){
    let x = parseInt(childArr[3]);
    navigate('/child-update', { state: { name: childArr[0], surname: childArr[1], walletID: childArr[2], timestamp: x } } );

  };

  childrenObjectsArray.forEach(childArr => {
    if(childArr[2] != "0x0000000000000000000000000000000000000000"  ){
      avatarArray.push(
        <Card className="avatar-card" hoverable
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
    contentToRender = 
    <Card className="warning-card">
      <h1 className="warning-card-text">ÇOCUKLARIM</h1>
      <WarningFilled className="warning-icon"/>
      <h1 style={{color:"rgb(204, 192, 192)"}}>Çocuk bulunamadı! Aşağıdaki "Çocuk Ekle" butonunu kullarak çocuklarınızı sisteme ekleyebilirsiniz.</h1>
      <br/>
      <Button className="btn" onClick={getChildAddPage} shape="round">
        <UserAddOutlined/>
        ÇOCUK EKLE</Button>

    </Card>
  }
  else{
    contentToRender = 
    <Card
    className="children-card">
      <h1 className="children-card-text">ÇOCUKLARIM</h1>
        <Button className="btn" onClick={getChildAddPage} shape="round" style={{left:"75%", right:"5%", marginTop:"2.5%", position:"absolute"}}>
          <UserAddOutlined/>
          ÇOCUK EKLE</Button>
          
          <div className="avatars">
          {avatarArray}
          </div>
          
    </Card>
  }

  

  
  return (
      <Layout className='layout' style={{
      height: '100%', overflow: 'hidden', position: 'fixed'}}>

          <Content>
          <Layout className="site-layout-background" style={{
            height: '100%', overflow: 'hidden'}}>
                  <Sider style={{background:"#2A2E30"}} width={200}>
        <img src={logo} alt="Logo" width="150%" height="20%"></img>
          <Menu
            defaultSelectedKeys={['']}
            defaultOpenKeys={['']}
            style={{background:"#2A2E30", height:"71.2vh", width:"100.5%", color:"white"}}
            items={items}>
            </Menu>
        </Sider>

        <Content>  
          <div className="mid-container">
            {contentToRender}
          </div>
        </Content>

          </Layout>
          </Content>

          <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>

      </Layout>
  );
      
    
};
  
export default ChildViewerPage;
