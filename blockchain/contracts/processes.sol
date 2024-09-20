// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Processes {

    struct Process {
        uint id;                // this especific process, containing id and quantity
        string name;            // other info
        string description;     // other info
        uint [] involvedtokens; // id of products that use this process
        uint timestamp;         // when it was applied, just in case it is not the same date than token creation
        address maker;          // who applied this proces
        bool active;
        string hashIPFS;        // hash of the elements of the struct, for auditing AND IPFS 
    }

    mapping(uint => Process) private processChanges; //

    
    uint private tokensCount;
    uint private pedigreeCount;
    uint private processCount;
    uint private stakeholdersCount;


    // events, since SC is for global accounts it does not have too much sense but is left here 
    event changeStatusEvent (); // triggers status change
    event processCreatedEvent (uint processId, string layer);
    event updateEvent (); // triggers update complete

    address constant public stakeholder = 0xE0f5206BBD039e7b0592d8918820024e2a7437b9; // who registers the token into system. 
    address constant public stakeholder2 = 0xE0F5206bbd039e7b0592d8918820024E2A743222;

    constructor () { // constructor, inserts new token in system. we map starting from id=1, hardcoded values of all
        // addProcess("Boiling",1130009112019,"Elevate temperature till 100 degrees to cook"); //
    }
    
    // add process item to a token, updates hash
    function createProcess (string memory _name, uint _timestamp, string memory _description, string memory _layer) public {

        processCount++;

        processChanges[processCount].id = processCount;
        processChanges[processCount].name = _name; 
        processChanges[processCount].timestamp = _timestamp; 
        processChanges[processCount].description = _description; 
        processChanges[processCount].maker = msg.sender;
        processChanges[processCount].active = true; 
        emit processCreatedEvent(processCount, _layer); // trigger event 
    
    }

    // we add a product to a process to keep track of it
    function addProductTokenToProcess(uint _processId, uint _productId) public {
        require(_processId > 0 && _processId <= processCount);

        processChanges[_processId].involvedtokens.push(_productId);
        emit updateEvent(); // trigger event 
    }

    function changeStatus (uint _id, bool _active) public { 
        require(_id > 0 && _id <= processCount); 

        processChanges[processCount].active = _active;
        emit changeStatusEvent(); // trigger event 
    }
    
    // get the products managed by the process
    function getStakeholdersToken (uint _id) public view returns (uint [] memory)  {
        require(_id > 0 && _id <= processCount);  // security check avoid memory leaks
        require(msg.sender == processChanges[_id].maker);
        
        return processChanges[_id].involvedtokens;
    }

    function getProcess (uint _processId) public view returns (Process memory)  {
        require(_processId > 0 && _processId <= processCount); 
        require(msg.sender==processChanges[_processId].maker); // only if he is the author of the content
        
        return processChanges[_processId];
    }
    
    // returns global number of stories, needed to iterate the mapping and to know info.
    function getNumberOfProcesses () public view returns (uint){
    //tx.origin 
        return processCount;
    }
    

    
}