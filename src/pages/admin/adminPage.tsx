import { Content, Header } from "antd/lib/layout/layout";
import './style.css';
import teamLogo from './team-logo.png';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import metamaskGif from './metamask.gif';


interface DataType {
    key: string;
    name: string;
    age: number;
    wealth: string;
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
      title: 'Yaş',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Varlık',
      dataIndex: 'wealth',
      key: 'wealth',
    },
    {
      title: 'Kayıt Tarihi',
      key: 'loginDate',
      dataIndex: 'loginDate',
    },
    {
        title: 'İşlemler',
        key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Sil {record.name}</a>
              
            </Space>
          ),
      },
];

const data: DataType[] = [
    {
      key: '1',
      name: 'Isim Soyisim',
      age: 0,
      wealth: '500 ETH',
      loginDate: '16/08/2022',
    },
    {
      key: '2',
      name: 'İsim Soyisim',
      age: 0,
      wealth: '500 ETH',
      loginDate: '16/08/2022',
    },
    {
      key: '3',
      name: 'İsim Soyisim',
      age: 0,
      wealth: '500 ETH',
      loginDate: '16/08/2022',
    },
];
  



const AdminPanel = () => {
    return (
        <div className="main">
            <Header className="header" style={{background: '#2A2E30', height: 85}}>
            
              <div className="logo">
                <img className="team-logo" src={teamLogo} width="80" height="80"></img>
              </div>

              <div className="logo-gif">
                <img className="metamask-gif" src={metamaskGif} width="80" height="70"></img>
              </div>

              <div className="header-text">
                <h2 style={{color: '#fff'}}>Admin Panel</h2>
              </div>

            </Header>

            <Content>

              

              <div className="site-layout-background" style={{background: '#D6D6D2' ,padding: 24, minHeight: 636 }}>
                <h2 className="total-balance" style={{textAlign: 'center', minHeight: 180,background: '#2A2E30',color: '#fff'}}>
                  Toplam Varlık <br /> <br />
                  300 ETH <br /> <br />
                  577.065 $
                </h2>
                <Table className="arayuz" columns={columns} dataSource={data} />

              </div>

              

            </Content>
            
            


        </div>
    );
};

export default AdminPanel;