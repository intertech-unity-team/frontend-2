import { Content, Footer, Header } from "antd/lib/layout/layout";
import './style.css';
import { Space, Table, Tag, Button, Layout } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ethers } from "ethers";
import { PATENT_ADDRESS, PATENT_ABI } from "../../constants/MyProject";
import backgroundImg from '../../assets/img/np.png';

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import Sider from "antd/lib/layout/Sider";
import { useState } from "react";
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






async function getAllOfParents() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);
  const allP = await contract.get_All_Parents();
  console.log(allP[0][2]);
  
  
}


let allParentsName : string[] = [];
let allParentsSurname : string[] = [];
let allParentsEmail : string[] = [];
let allParentsPhoneNum : string[] = [];
    

//getAllOfParents();




interface DataType {
    key: string;
    name: string;
}

const columns: ColumnsType<DataType> = [
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
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
      name: allParentsName[0],
    },
    {
      key: '2',
      name: allParentsName[0],
    },
    { 
      key: '3',
      name: allParentsName[0],
    },
    {
      key: '4',
      name: allParentsName[0],
    },
    {
      key: '5',
      name: allParentsName[0],
    },
    {
      key: '5',
      name: allParentsName[0],
    },
    {
      key: '5',
      name: allParentsName[0],
    },
    {
      key: '5',
      name: allParentsName[0],
    },
];




const AdminPanel = () => {
  
  
  async function get_all_of_parents() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

    const getAllP = await contract.get_All_Parents();
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
    
  }
  get_all_of_parents();
  console.log(allParentsName);

  
  
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