// app.js

// Endereço do contrato e ABI (atualize após o deploy do contrato)
const contractAddress = "0xSeuEnderecoDoContrato"; // Substitua pelo endereço real
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "createProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "purchaseProduct",
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
      "name": "products",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "purchased",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "productCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];

let web3;
let marketplaceContract;
let accounts;

window.addEventListener('load', async () => {
    // Verifica se o navegador possui MetaMask
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Solicita acesso à conta do usuário
            accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('account').innerText = "Conta: " + accounts[0];
            
            // Instancia o contrato
            marketplaceContract = new web3.eth.Contract(contractABI, contractAddress);
            
            loadProducts();
        } catch (error) {
            console.error("Acesso negado ao MetaMask");
        }
    } else {
        alert("MetaMask não detectado. Por favor, instale a extensão MetaMask.");
    }
});

// Função para carregar os produtos cadastrados
async function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = "";
    const count = await marketplaceContract.methods.productCount().call();
    for (let i = 1; i <= count; i++) {
        const product = await marketplaceContract.methods.products(i).call();
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Preço: ${web3.utils.fromWei(product.price, 'ether')} ETH</p>
            <p>Vendedor: ${product.seller}</p>
            <p>Status: ${product.purchased ? "Comprado" : "Disponível"}</p>
        `;
        // Se o produto estiver disponível e o usuário não for o vendedor, exibe botão para comprar
        if (!product.purchased && product.seller !== accounts[0]) {
            const buyButton = document.createElement('button');
            buyButton.innerText = "Comprar";
            buyButton.onclick = () => purchaseProduct(product.id, product.price);
            productDiv.appendChild(buyButton);
        }
        productList.appendChild(productDiv);
    }
}

// Função para cadastrar um novo produto
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    let price = document.getElementById('productPrice').value;
    // Converte ETH para Wei
    price = web3.utils.toWei(price, 'ether');
    try {
        await marketplaceContract.methods.createProduct(name, price)
            .send({ from: accounts[0] });
        loadProducts();
    } catch (error) {
        console.error("Erro ao criar produto:", error);
    }
});

// Função para realizar a compra de um produto
async function purchaseProduct(id, price) {
    try {
        await marketplaceContract.methods.purchaseProduct(id)
            .send({ from: accounts[0], value: price });
        loadProducts();
    } catch (error) {
        console.error("Erro ao comprar produto:", error);
    }
}
