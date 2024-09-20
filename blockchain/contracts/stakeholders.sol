// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Stakeholders {
 
    struct Stakeholder{
        uint id;                // this especific process, containing id and quantity
        string company;            // the product
        string name;            // the product
        string timestamp;       // when it was applied, just in case it is not the same date than token creation
        uint [] involvedtokens; // produced products 
        string description;     // other info
        address maker;          // who applied this proces
        bool active;
        string hashIPFS;        // hash of the elements of the struct, for auditing AND IPFS 
    }

    mapping(uint => Stakeholder) private stakeholderChanges; //

    uint private tokensCount;
    uint private stakeholderCount;
    string[] public companyNames;

    // events, since SC is for global accounts it does not have too much sense but is left here 
    event changeStatusEvent ( // triggers status change
    );
    event stakeholderAddedEvent (uint stakeholderId, string layer);
    event updateEvent ( // triggers update complete
    );
    
    // add stakeholder to the list
    function createStakeholder(string memory _company, string memory _name, string memory _timestamp, string memory _description, string memory _layer) public {
        /*require(_tokenId > 0 && _tokenId <= tokensCount);  // security check avoid memory leaks
        require(msg.sender == tokens[_tokenId].owner); //Only token creator can modify it. We can relax this after
        require(true==tokens[_tokenId].active); //  only if active
        */
        stakeholderCount++;
        stakeholderChanges[stakeholderCount].id = stakeholderCount;
        stakeholderChanges[stakeholderCount].company = _company; 
        stakeholderChanges[stakeholderCount].name = _name; 
        stakeholderChanges[stakeholderCount].timestamp = _timestamp; 
        stakeholderChanges[stakeholderCount].description = _description; 
        stakeholderChanges[stakeholderCount].active = true; 
        stakeholderChanges[stakeholderCount].maker = msg.sender;

        companyNames.push(_company);

        emit stakeholderAddedEvent(stakeholderCount, _layer); // trigger event 
    }

    function addStakeholderProductToken(uint _stakeholderId, uint _id) public {
        stakeholderChanges[_stakeholderId].involvedtokens.push(_id);

        emit updateEvent(); // trigger event 
    }
    
    // get the products managed by the stakeholder
    function getStakeholdersProductToken (uint _id) public view returns (uint [] memory)  {
        require(_id > 0 && _id <= stakeholderCount);  // security check avoid memory leaks
        // require(msg.sender == stakeholderChanges[_id].maker);
        
        return stakeholderChanges[_id].involvedtokens;
    }

    function changeStatus (uint _id, bool _active) public {
        require(_id > 0 && _id <= stakeholderCount); 
        
        stakeholderChanges[stakeholderCount].active = _active;

        emit changeStatusEvent(); // trigger event 
    }

    function getStakeholder (uint _id) public view returns (Stakeholder memory)  {
        require(_id > 0 && _id <= stakeholderCount);  
        // require(msg.sender == stakeholderChanges[_id].maker); // only if he is the author of the content
        
        return stakeholderChanges[_id];
    }

    function checkStakeholderByCompanyName (string memory _name) public view returns (int)  {
        int index = -1;

        uint length = companyNames.length;

        if (length > 0) {
            for(uint256 i = 0; i < companyNames.length; ++i) {
                string memory companyName =  companyNames[i];
                bool isEqual = compareStrings(_name, companyName);

                if (isEqual) {
                    index = int(i);
                    break;
                }
            } 
        }

        return index;
    }
    
    // returns global number of status, needed to iterate the mapping and to know info.
    function getNumberOfStakeholders () public view returns (uint){    
        //tx.origin
        return stakeholderCount;
    }

    function compareStrings(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

}
