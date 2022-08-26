import { Content, Header } from "antd/lib/layout/layout";
import './style.css';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ethers } from "ethers";
import { PATENT_ADDRESS, PATENT_ABI } from "../../constants/MyProject";

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
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


let allParentsName:string[]; 
let allParentsSurname:string[]; 
let allParentsWalletID:string[]; 

allParentsName = [];
allParentsWalletID = [];


let allParentsArray:string[];
allParentsArray = [];



async function getAllOfParents() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);
  const allP = await contract.get_All_Parents();
  console.log(allP[0][2]);
  
  while (allParentsName.length < allP.length) {
    allParentsName.push(allP[0][0]);
    
  }
  
  console.log(allParentsName);
  
  
}

    

//getAllOfParents();




interface DataType {
    key: string;
    name: string;
    loginDate: string;
}

const columns: ColumnsType<DataType> = [
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Kayıt Tarihi',
      key: 'loginDate',
      dataIndex: 'loginDate',
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

const data: DataType[] = [
    {
      key: '1',
      name: 'Isim Soyisim',
      loginDate: '01/01/0001',
    },
    {
      key: '2',
      name: 'İsim Soyisim',
      loginDate: '01/01/0001',
    },
    {
      key: '3',
      name: 'İsim Soyisim',
      loginDate: '01/01/0001',
    },
];
  



const AdminPanel = () => {

  
    return (
        <div className="main">
            <Header className="header" style={{background: '#2A2E30', height: 85}}>

              <div className="header-text">
                <h2 style={{color: '#fff'}}>Admin Panel</h2>
              </div>

            </Header>

            <Content>

              

              <div className="site-layout-background" style={{background: '#D6D6D2' ,padding: 24, minHeight: 636 }}>
                
                <Table className="arayuz" columns={columns} dataSource={data} />

              </div>

              

            </Content>
            
            


        </div>
    );
};

export default AdminPanel;