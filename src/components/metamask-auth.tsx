import React from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import { Button } from 'antd';
import './style.css';
import { ethers } from "ethers";




export async function accountCheck() {
    if(!window.ethereum){
        window.location.href="https://metamask.io/download/"
    }
}



async function getAccount() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return account;

}

export default function ConnectButton() {
    const connectButtonOnClick = () => {
        accountCheck();
        if (typeof window !== "undefined") {
            
            getAccount().then((response) => {
                console.log(response);
            });
            
        }
    };

    

    return (
        <div className="connect-button">
            <Button onClick={connectButtonOnClick}>
                Connect Button
            </Button>
            
        </div>
    );

}




