import React from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import { Button } from 'antd';
import './style.css';
import { ethers } from "ethers";

// Videodan alınan kod
export const PATENT_ADDRESS = "0xD933A77499a11f3F4C08a66AC5DdC0D64EA5dEF8";
export const PATENT_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "surname",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "childAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "releaseTime",
          "type": "uint256"
        }
      ],
      "name": "addChild",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "surname",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "parentAddress",
          "type": "address"
        }
      ],
      "name": "addParent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "address_child",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "releaseTime",
          "type": "uint256"
        }
      ],
      "name": "child_Withdraws_Money",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "myaddress",
          "type": "address"
        }
      ],
      "name": "deleteChildWithID",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "address_child",
          "type": "address"
        }
      ],
      "name": "deposit_to_Child",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllParents",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "surname",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "parentAddress",
              "type": "address"
            },
            {
              "internalType": "address[]",
              "name": "children",
              "type": "address[]"
            }
          ],
          "internalType": "struct MyProject.Parent[]",
          "name": "result",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getChild",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "surname",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "childAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "releaseTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "internalType": "struct MyProject.Child",
          "name": "result",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getParent",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "surname",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "parentAddress",
              "type": "address"
            },
            {
              "internalType": "address[]",
              "name": "children",
              "type": "address[]"
            }
          ],
          "internalType": "struct MyProject.Parent",
          "name": "result",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "wanted_address",
          "type": "address"
        }
      ],
      "name": "getRole",
      "outputs": [
        {
          "internalType": "enum MyProject.Role",
          "name": "result",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get_Balance_of_Contract",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "address_child",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "parent_Withdraws_Money",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "parentaddresslist",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
// Videodan alınan kod
const createApp = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);
    
    const deneme = contract.getParent();
    await deneme.wait();

    console.log(deneme);

}

async function accountCheck() {
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




