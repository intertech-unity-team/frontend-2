import { Content, Header } from "antd/lib/layout/layout";
import './style.css';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';







interface DataType {
    key: string;
    name: string;
    age: number;
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
      title: 'Kayıt Tarihi',
      key: 'loginDate',
      dataIndex: 'loginDate',
    },
    {
        title: 'Düzenle',
        key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Button>Düzenle</Button>
              
            </Space>
          ),
      },
];

const data: DataType[] = [
    {
      key: '1',
      name: 'Isim Soyisim',
      age: 0,
      loginDate: '01/01/0001',
    },
    {
      key: '2',
      name: 'İsim Soyisim',
      age: 0,
      loginDate: '01/01/0001',
    },
    {
      key: '3',
      name: 'İsim Soyisim',
      age: 0,
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