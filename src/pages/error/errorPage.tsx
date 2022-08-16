import { Button } from 'antd';
import './style.css';

function getHomePage() {
    window.location.href="http://localhost:3000/"
}

const ErrorPage = () => {
    return (
        <div className='main'>

            <header className='team-name'>
                <h1>UNITY</h1>
            </header>

            <header className='error-pic'>
                <img src='https://i.ibb.co/M2qw7BL/error-Picture.jpg'></img>
            </header>

            <header className='text'>
                <h1>Üzgünüz, sayfanız kaybolmuş olabilir.<br />(ya da paranız çalındı)</h1>
            </header>

            <header className='button'>
                <Button className='go-back' type='primary' shape='round' onClick={getHomePage}>Anasayfaya Geri Dön</Button>
            </header>
            
        </div>
    );
};

export default ErrorPage;