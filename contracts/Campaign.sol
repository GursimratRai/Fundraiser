//SPDX-License-Identifier: Unlicensed

pragma solidity >= 0.7.0 <=0.9.0;

contract CampaignFactory {
    // for tracking all the campaigns 
    address[] public deployedCampaigns ;
    //for creating a record for a campaign
    event campaignCreated(string title,uint requiredAmount,address indexed owner,address campaingAddress,string imageUrl,uint indexed timestamp, string indexed category);
    //for creating a campaign
    function createCampaign(string memory _title,uint _requiredAmount,string memory _story,string memory _category,string memory _url) public {
        Campaign newCampaign = new Campaign(_title,_requiredAmount,_story,_category,_url,msg.sender);           
        deployedCampaigns.push(address(newCampaign)); 
        emit campaignCreated(_title,_requiredAmount,msg.sender,address(newCampaign),_url,block.timestamp,_category);
    }
}

contract Campaign {
    //Campaign title 
    string public  title;
    //Campaign story 
    string public  story;
    //Campaign category
    string public category;
    //Required fund for the campaign / cause    
    uint public  requiredAmount;
    //Received fund from campaign   
    uint public receivedAmount;
    //Campaign banner url 
    string public  imageUrl;
    //address of the owner 
    address payable public owner; 

    //event for recording the transactions 
    event donated(address indexed donar ,uint indexed amount,uint indexed timestamp);

    constructor (string memory _title,uint _requiredAmount,string memory _story ,string memory _category, string memory _url,address _campaignowner) {
        title = _title;
        story = _story;
        requiredAmount = _requiredAmount;
        imageUrl = _url;
        category = _category;
        owner = payable(_campaignowner);
    } 
     
    //function for transferring the fund 
    function donate() public payable {
        require(requiredAmount > receivedAmount , "Required Amount FullFilled");
        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    } 
}
