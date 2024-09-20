// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./processes.sol";
import "./stakeholders.sol";

contract MutableTokens{

    struct Token {
        uint id;
        bool isMutable;
        string name;
        string information;
        string [] timestamp;
        uint [] pedigreetoken;      // id of items that conform this token
        uint [] processesToken;     // ids of processes than conform this token
        uint [] stakeholderstoken;  // stakeholders involved
        address owner;              // who created the token 
        bool active;                // if necessary, to disable or enable it. 
        bytes32 hashIPFS;            // hash of the elements of the struct, for auditing AND IPFS 
    }
    // key is a uint, later corresponding to the token id
    // what we store (the value) is a Car
    // the information of this mapping is the set of cars available in this SC.
    mapping(uint => Token) private tokens;

    struct Pedigree {
        uint id; // this especific tuple, containing id and quantity
        uint id_pedigree_token; // the product or token
        uint quantity; // amount of product
        string timestamp; // date of this tuple creation
        address maker; // who creates
        bytes32 hashIPFS; // hash of the elements of the struct, for auditing AND IPFS 
    }

    mapping(uint => Pedigree) private pedigreeChanges; // all the pedigree tuples
    

     struct Product {
        uint id; // this especific tuple, containing id and quantity
        string name; // the product
        string description; // the product
        string timestamp; // date of this tuple creation
        address maker; // who creates
        bytes32 hashIPFS; // hash of the elements of the struct, for auditing AND IPFS 
    }
    mapping(uint => Product) private productChanges; // all the pedigree tuples


    uint private tokensCount;
    uint private productCount;
    uint private pedigreeCount;
    uint private processCount;
    uint private stakeholdersCount;


    // events, since SC is for global accounts it does not have too much sense but is left here 
    event changeStatusEvent (uint tokenId);
    event createProductEvent (uint productId, string layer);
    event createPedigreeEvent (uint pedigreeId, string layer);
    event forwardUpdatedTokenEvent (uint tokenId, string info, string _nextLayer);    
    event traceTokenCreated (address owner, uint tokenId);
    event updateTokenEvent (uint tokenId);    

    // addresses are hardcoded to ease testing. Just delete them afterwards. 
    address constant public stakeholder = 0xE0f5206BBD039e7b0592d8918820024e2a7437b9; // who registers the token into system. 
    address constant public stakeholder2 = 0xE0F5206bbd039e7b0592d8918820024E2A743222;

    constructor () { // constructor, inserts new token in system. we map starting from id=1, hardcoded values of all
        // addToken("Ketchup","Tomato based sauce",1130009112019); // initial token. Example. Can be edited to insert a generic initial token
    }
    
    function createToken (string memory _name, string memory _information, string memory _timestamp) public {
        //require(msg.sender==manufacturer);

        tokensCount ++; // inc count at the beginning. represents ID also. 
        tokens[tokensCount].id = tokensCount; 
        tokens[tokensCount].name = _name;
        tokens[tokensCount].information = _information;
        tokens[tokensCount].timestamp.push(_timestamp);
        tokens[tokensCount].owner = msg.sender;
        tokens[tokensCount].active = true;
        //tokens[tokensCount].hashIPFS = keccak256(abi.encodePacked(block.number,msg.data, tokens[_tokenId].id, tokens[_tokenId].owner));
        //tokens[tokensCount].hashIPFS = keccak256(abi.encodePacked(block.number,msg.data, tokens[_tokenId].id, tokens[_tokenId].name, tokens[_tokenId].information, tokens[_tokenId].timestamp, tokens[_tokenId].owner));

        emit traceTokenCreated(msg.sender, tokensCount);
    }

    function updateToken (uint _tokenId, string memory _name, string memory _information, string memory _timestamp) public {
        require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks

        tokens[_tokenId].name = _name;
        tokens[_tokenId].information = _information;
        tokens[_tokenId].timestamp.push(_timestamp);

        emit updateTokenEvent(_tokenId); // trigger event 
    }
    
    // add pedigree item to a token, updates hash
    function createPedigree (uint _tokenId, uint _id_pedigree_token, uint _quantity, string memory _timestamp) public {
        require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        /*require(msg.sender == tokens[_tokenId].owner); //Only token creator can modify it. We can relax this after
        require(true==tokens[_tokenId].active); //  only if active
        */
        pedigreeCount++;
        
        bytes32 _hashIPFS = retrieveHash(_tokenId);
        pedigreeChanges[pedigreeCount] = Pedigree(pedigreeCount, _id_pedigree_token, _quantity,_timestamp, msg.sender, _hashIPFS); // the global struct
        // pedigreeChanges[pedigreeCount] = Pedigree(pedigreeCount, _id_pedigree_token, _quantity,_timestamp, msg.sender); // the global struct
        tokens[_tokenId].pedigreetoken.push(pedigreeCount); //  we store the reference in the corresponding token
    
        // update hash
        //tokens[_tokenId].hashIPFS = keccak256(abi.encodePacked(block.number,msg.data, tokens[_tokenId].id, tokens[_tokenId].name, tokens[_tokenId].information, tokens[_tokenId].timestamp, tokens[_tokenId].owner));

        emit updateTokenEvent(_tokenId); // trigger event 
    }

    function createElementalPedigree (uint _tokenId, uint _id_product, uint _quantity, string memory _timestamp, string memory _layer) public {
        require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        require(_id_product > 0 && _id_product <= productCount); //   if product exists
        /*require(msg.sender == tokens[_tokenId].owner); //Only token creator can modify it. We can relax this after
        require(true==tokens[_tokenId].active); */

        pedigreeCount++;
        
        bytes32 _hashIPFS = retrieveHash(_tokenId);
        pedigreeChanges[pedigreeCount] = Pedigree(pedigreeCount, _id_product, _quantity,_timestamp, msg.sender, _hashIPFS); // the global struct

        // pedigreeChanges[pedigreeCount] = Pedigree(pedigreeCount, _id_product, _quantity,_timestamp, msg.sender); // the global struct
        tokens[_tokenId].pedigreetoken.push(pedigreeCount); //  we store the reference in the corresponding token
    
        // update hash
        //tokens[_tokenId].hashIPFS = keccak256(abi.encodePacked(block.number,msg.data, tokens[_tokenId].id, tokens[_tokenId].name, tokens[_tokenId].information, tokens[_tokenId].timestamp, tokens[_tokenId].owner));

        emit createPedigreeEvent(pedigreeCount, _layer); // trigger event 
    }

    function createProduct (string memory _name, string memory _description, string memory _timestamp, string memory _layer) public {
        /*require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        require(msg.sender == tokens[_tokenId].owner); //Only token creator can modify it. We can relax this after
        require(true==tokens[_tokenId].active); //  only if active
        */
        productCount++;
        
        productChanges[productCount].id = productCount;
        productChanges[productCount].name = _name;
        productChanges[productCount].description = _description;
        productChanges[productCount].timestamp= _timestamp;
        productChanges[productCount].maker = msg.sender;

        emit createProductEvent(productCount, _layer); // trigger event 
    }

    function addProcess (uint _tokenId, uint _pId) public {
        require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        /*require(msg.sender == tokens[_tokenId].owner); //Only token creator can modify it. We can relax this after
        require(true==tokens[_tokenId].active); //  only if active
        */
        tokens[_tokenId].processesToken.push(_pId);


        emit updateTokenEvent(_tokenId); // trigger event 
    }

    function addStakeholder (uint _tokenId, uint _pId) public {
        require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        /*require(msg.sender == tokens[_tokenId].owner); //Only token creator can modify it. We can relax this after
        require(true==tokens[_tokenId].active); //  only if active
        */
        tokens[_tokenId].stakeholderstoken.push(_pId);

        emit updateTokenEvent(_tokenId); // trigger event 
    }
    
    function changeStatusToken (uint _tokenId, bool _active) public { 
        require(_tokenId > 0 && _tokenId <= tokensCount);

        tokens[_tokenId].active = _active;  
        emit changeStatusEvent(_tokenId); // trigger event 
    }
    
    function retrieveHash (uint _tokenId) public view returns (bytes32){ 
        //compute hash according to unique characteristics
        // this example hashes a transaction as a whole and info
        // we can also just hash the info of the token. 
        return keccak256(abi.encodePacked(block.number,msg.data, tokens[_tokenId].id, tokens[_tokenId].owner));
        // return keccak256(abi.encodePacked(block.number,msg.data, tokens[_tokenId].id, tokens[_tokenId].name, tokens[_tokenId].information, tokens[_tokenId].timestamp, tokens[_tokenId].owner));
    }
    
    // getters structs of a token
    // get the array of pedigrees of a product, later we can loop them using getters to obtain the data
    function getPedigreeToken (uint _tokenId) public view returns (uint [] memory)  {
        require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        require(msg.sender == tokens[_tokenId].owner); 
       
        return tokens[_tokenId].pedigreetoken;
    }
    
    // get the array of changes of a product, later we can loop them using getters to obtain the data
    function getProcessesToken (uint _tokenId) public view returns (uint [] memory)  {
        require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        require(msg.sender == tokens[_tokenId].owner); 
        
        return tokens[_tokenId].processesToken;
    }
    
    // get the array of changes of a product, later we can loop them using getters to obtain the data
    function getStakeholderToken (uint _tokenId) public view returns (uint [] memory)  {
        require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        require(msg.sender == tokens[_tokenId].owner); 
        
        return tokens[_tokenId].stakeholderstoken;
    }
    
    // getters specific token
    function getTokenById (uint _tokenId) public view returns (Token memory)  {
        require(_tokenId > 0 && _tokenId <= tokensCount); 
        require(msg.sender==tokens[_tokenId].owner); // only if he is the author of the content
        
        return tokens[_tokenId];
    }

    // getters specific number of story or status
    function getPedigree (uint _pedigreeId) public view returns (Pedigree memory)  {
        require(_pedigreeId > 0 && _pedigreeId <= pedigreeCount); 
        require(msg.sender==pedigreeChanges[_pedigreeId].maker); // only if he is the author of the content
        
        return pedigreeChanges[_pedigreeId];
    }
    // getters specific number of story or status
    function getProduct (uint _productId) public view returns (Product memory)  {
        require(_productId > 0 && _productId <= productCount); 
        require(msg.sender==productChanges[_productId].maker); // only if he is the author of the content
        
        return productChanges[_productId];
    }

    // getters global such as number of structs, for statistics
    // returns global number of cars, needed to iterate the mapping and to know info.
    function getNumberOfTokens () public view returns (uint){
        return tokensCount;
    }
    
    // returns global number of stories, needed to iterate the mapping and to know info.
    // smart to smart comm
    function updateNumberOfProcesses (address addr) public view returns (uint){
        
        Processes p = Processes(addr);
        return p.getNumberOfProcesses();
       
    }
    
    // returns global number of status, needed to iterate the mapping and to know info.
    // smart to smart comm
    function updateNumberOfStakeholders (address addr) public view returns (uint){
        
        Stakeholders s = Stakeholders(addr);
        return s.getNumberOfStakeholders();
        
    }

    function triggerTokenUpdatedEvent (uint _tokenId, string memory _info, string memory _layer) public {
        require(_tokenId > 0 && _tokenId <= tokensCount);
        
        emit forwardUpdatedTokenEvent(_tokenId, _info, _layer);       
    }  
}
