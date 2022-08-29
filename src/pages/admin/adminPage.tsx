import { Content, Footer, Header } from "antd/lib/layout/layout";
import './style.css';
import { Space, Table, Tag, Button, Layout, MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ethers } from "ethers";
import { PATENT_ADDRESS, PATENT_ABI } from "../../constants/MyProject";
import backgroundImg from '../../assets/img/np.png';

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import Sider from "antd/lib/layout/Sider";
import { useState } from "react";
import { ItemType } from "antd/lib/menu/hooks/useItems";
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <p>birinci cocuk</p>
        ),
      },
      {
        key: '2',
        label: (
          <p>ikinci cocuk, wallet id: 0xabcdef</p>
        ),
      },
      
      
    ]}
  />
);



let allParentsName : string[] = [];
let allParentsSurname : string[] = [];
let allParentsEmail : string[] = [];
let allParentsPhoneNum : string[] = [];
let allParentsWalletID : string[] = [];
    

interface DataType {
  key: string;
  name: string;
  mail: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'İsim Soyisim',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'E-posta',
    dataIndex: 'mail',
    key: 'mail',
  },
  
  {
      title: 'Cocuklar',
      key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Dropdown overlay={menu}>
              <a onClick={e => e.preventDefault()}>
                <Space>
                  Cocuk Listesi
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        ),
    },
];




async function get_all_of_parents() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  const getAllP = await contract.get_All_Parents();
  return getAllP;
  /*
  // isim icin
  getAllP.forEach((allParentsNameArr: never[]) => {
    let parentName = allParentsNameArr[0];
    
    allParentsName.push(parentName);
  });
  // soyisim icin
  getAllP.forEach((allParentsSurnameArr: never[]) => {
    let parentSurname = allParentsSurnameArr[0];

    allParentsSurname.push(parentSurname);
  });
  */
}


async function getParentInfo() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

  // Parent hesabını seçip sonra aşağıyı çalıştırın

  const getP = await contract.getParent();
  return getP;
}



const AdminPanel = () => {
  const [updateChildNameInput, setUpdateChildNameInput] = useState("");
  const [updateChildSurnameInput, setUpdateChildSurnameInput] = useState("");
  const [updateChildWalletID, setUpdateChildWalletID] = useState("");

  const [childrenObjectsArray, setChildrenObjectsArray] = useState([]);
  const [childrenNamesArray, setChildrenNamesArray] = useState<string[]>([]);

  const [sendMoneyAmount, setSendAmount] = useState(0);

  const [pName , setPName] = useState('');
  const [pSurname , setPSurname] = useState('');
  const [pMail , setPMail] = useState('');
  const [pPhoneNum , setPhoneNum] = useState('');
  const [pWalletID , setWalletID] = useState('');

  let childKey = 0;
const [childName, setChildName] = useState("");

// Dropdown menü ayarları
const handleMenuClick: MenuProps['onClick'] = e => {
    childKey = parseInt(e.key);
    setChildName(childrenNamesArray[childKey]);

    setUpdateChildNameInput(childrenObjectsArray[childKey][0]);
    setUpdateChildSurnameInput(childrenObjectsArray[childKey][1]);
    setUpdateChildWalletID(childrenObjectsArray[childKey][2]);
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

  
  let parentInfoPromise = get_all_of_parents().then(
    function(result){
      
      allParentsName.push(result[0][0]);
      console.log(allParentsName);
      setPName(allParentsName[0]);

      allParentsEmail.push(result[0][3]);
      setPMail(allParentsEmail[0]);

      allParentsPhoneNum.push(result[0][4]);
      setPhoneNum(allParentsPhoneNum[0]);

      allParentsWalletID.push(result[0][2]);
      setWalletID(allParentsWalletID[0]);
      
    }
  );

  

  
  const data: DataType[] = [
    {
      key: '1',
      name: pName,
      mail: pMail,
    },
    
  ];
  
  
    return (
      <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`, backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',height: '100%', overflow: 'hidden', position: 'fixed'}}>
        <Content style={{ padding: '0 0px' , overflow: 'hidden'}}>
          <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})` , backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat',height: '100%', overflow: 'hidden'}}>

        <Content style={{ padding: '0 50px 0', minHeight: 280, overflow: 'hidden'}}>                      

          <h2 className="main-text">Admin Panel</h2>
          <div className="arayuz-div">
          <Table className="arayuz" columns={columns} dataSource={data} pagination={{ pageSize: 5 }} tableLayout='auto' />
          </div>
          
        </Content>

      </Layout>
          </Content>

          <Footer style={{ textAlign: 'center', background:"#2A2E30", color:"white", position:"absolute", bottom:0, width:"100%"}} className="site-layout-background">BLOXIFY ©2022 Created by Team Unity</Footer>

      </Layout>
        
    );
};

export default AdminPanel;