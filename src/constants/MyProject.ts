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
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "phoneNumber",
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
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "phoneNumber",
        "type": "uint256"
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "childaddresslist",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "myaddress",
        "type": "address"
      }
    ],
    "name": "delete_Child_With_ID",
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
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneNumber",
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
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneNumber",
            "type": "uint256"
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
    "name": "get_All_Children",
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
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneNumber",
            "type": "uint256"
          }
        ],
        "internalType": "struct MyProject.Child[]",
        "name": "result2",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get_All_Parents",
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
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneNumber",
            "type": "uint256"
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
        "internalType": "address",
        "name": "parentAddress",
        "type": "address"
      }
    ],
    "name": "get_Children_Of_Parent",
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
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneNumber",
            "type": "uint256"
          }
        ],
        "internalType": "struct MyProject.Child[]",
        "name": "result3",
        "type": "tuple[]"
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
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "new_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "new_surname",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "myAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "new_releaseTime",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "new_email",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "new_phoneNumber",
        "type": "uint256"
      }
    ],
    "name": "update_Child_with_ID",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];