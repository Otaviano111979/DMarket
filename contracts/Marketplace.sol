// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    uint public productCount = 0;
    
    struct Product {
        uint id;
        string name;
        uint price; // Preço em wei
        address payable seller;
        bool purchased;
    }
    
    mapping(uint => Product) public products;
    
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address seller,
        bool purchased
    );
    
    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address seller,
        bool purchased,
        address buyer
    );
    
    // Função para criar um produto
    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Nome do produto é obrigatório");
        require(_price > 0, "Preço deve ser maior que zero");
        
        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender), false);
        
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }
    
    // Função para comprar um produto
    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        require(_product.id > 0 && _product.id <= productCount, "Produto não existe");
        require(msg.value >= _product.price, "Valor insuficiente para comprar");
        require(!_product.purchased, "Produto já foi comprado");
        require(_product.seller != msg.sender, "O vendedor não pode comprar seu próprio produto");
        
        // Transferir o valor para o vendedor
        _product.seller.transfer(_product.price);
        
        // Atualizar o status do produto
        _product.purchased = true;
        products[_id] = _product;
        
        emit ProductPurchased(_id, _product.name, _product.price, _product.seller, true, msg.sender);
    }
}
