import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ConnectButton from "../../components/metamask-auth";

const LogInPage = () => {
    return (
        <div>
            <ConnectButton />
        </div>
    );
};

export default LogInPage;