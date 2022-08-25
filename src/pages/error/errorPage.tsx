import { Button, Layout } from 'antd';
import './style.css';
import backgroundImg from '../../assets/img/xd.png';
import { Content } from 'antd/lib/layout/layout';

function getHomePage() {
    window.location.href="http://localhost:3000/"
}

const ErrorPage = () => {
    return (
        <div className='main'>
            <Layout className='layout' style={{backgroundImage:`url(${backgroundImg})`}}>
                <Content style={{ padding: '0 0px' }}>
                    <Layout className="site-layout-background" style={{ padding: '0px 0', backgroundImage:`url(${backgroundImg})` , backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '100%',}}>
                        <Content>
                            <div className='dugme'>
                            <Button className='go-back' type='default' shape='round' onClick={getHomePage} style={{margin: 'center'}}>Anasayfaya Geri Dön</Button>

                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            
            
                
            
            
        </div>
    );
};

export default ErrorPage;