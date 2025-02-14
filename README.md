# Decentralized Marketplace

This project is a decentralized platform inspired by systems like Shopify or Hotmart, allowing sellers to list products and buyers to make purchases using smart contracts on the Ethereum blockchain.

## Features

- **Product Listing:** Sellers can list products by providing a name and price.
- **Product Display:** The application displays all listed products along with their status.
- **Product Purchase:** Buyers can purchase products using Ethereum, with transactions processed automatically by smart contracts.

## Project Structure
marketplace-descentralizado/
│
├── contracts/
│   └── Marketplace.sol        # Contrato inteligente em Solidity
│
├── frontend/
│   ├── index.html             # Interface web principal
│   ├── app.js                 # Lógica de interação com o contrato
│   └── style.css              # Arquivo de estilos CSS
│
├── README.md                  # Documentação e instruções do projeto
└── package.json (opcional)    # Se utilizar Node.js para desenvolvimento


decentralized-marketplace/ │ ├── contracts/ │ └── Marketplace.sol # Solidity smart contract │ ├── frontend/ │ ├── index.html # Main web interface │ ├── app.js # Contract interaction logic │ └── style.css # CSS styles │ ├── README.md # Project documentation └── package.json (optional) # For Node.js development (if used)


## How to Run the Project

### 1. Deploy the Smart Contract

- Use [Remix IDE](https://remix.ethereum.org/) or [Truffle](https://www.trufflesuite.com/) to compile and deploy the `Marketplace.sol` contract to a test network (e.g., Rinkeby or Goerli).
- After deployment, copy the contract address and update the `contractAddress` variable in `frontend/app.js`.

### 2. Set Up the Web Interface

- In the `frontend/` directory, open the `index.html` file in your browser.
- Ensure you have [MetaMask](https://metamask.io/) installed and configured to the same network where the contract is deployed.
- Use the form to list products and view the available products.

### 3. Execute Transactions

- **List a Product:** Fill in the product name and price (in ETH) and submit the form to list a product.
- **Purchase a Product:** Click the "Buy" button on an available product. MetaMask will prompt you to confirm the transaction.

## Dependencies

- [Web3.js](https://web3js.readthedocs.io/) for blockchain interaction.
- MetaMask for connecting to the Ethereum network.

## Final Considerations

This project serves as a base for building a decentralized marketplace platform. It can be expanded with additional features such as:
- Storing images and metadata via IPFS.
- A review and rating system.
- Governance mechanisms using tokens.

Feel free to contribute and enhance this project!

#Decentralized
#Blockchain
#Ethereum
#SmartContracts
#Web3
#Marketplace
#CryptoCommerce
#OpenSource
#FinTech
#Innovation
