// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CrowdFunding {
    struct Campaign {
        string name;
        string description;
        string image;
        uint256 target;
        uint256 totalRaised;
        uint256 currentBalance;
        address owner;
        address[] donators;
        uint256[] donation;
    } 

    uint256 public numberOfCampaign = 0;
    mapping(uint256=>Campaign) public intToCampaign;

    function createCampaign(string memory _name, string memory _description, string memory _image, uint256 _target, address _owner) public returns (uint256){
        Campaign storage newCampaign = intToCampaign[numberOfCampaign];
        newCampaign.owner = _owner;
        newCampaign.name = _name;
        newCampaign.description = _description;
        newCampaign.image = _image;
        newCampaign.target = _target;

        numberOfCampaign++;
        return numberOfCampaign - 1;
    }

    function fund(uint256 _idx) public payable {
        
        Campaign storage campaign = intToCampaign[_idx];
        
        campaign.donators.push(msg.sender);
        campaign.donation.push(msg.value);
        campaign.totalRaised += msg.value;
        campaign.currentBalance += msg.value;
    }

    function withdraw(uint256 _idx) public onlyCampaignOwner(_idx){
        (bool callSent,) = payable(msg.sender).call{value:address(this).balance}("");
        require(callSent,"Something went wrong");  
        intToCampaign[_idx].currentBalance = 0;
    }

    modifier onlyCampaignOwner(uint256 _idx){
        require(msg.sender == intToCampaign[_idx].owner,"Only owner can withdraw money");
        _;
    } 
    
    function getAllCampaign() public view returns(Campaign[] memory){
        Campaign[] memory allCampaign = new Campaign[](numberOfCampaign);
        for(uint i = 0;i<numberOfCampaign;i++){
            allCampaign[i] = intToCampaign[i];
        }
        return allCampaign;
    }

    function getAllDonators(uint256 _idx) public view returns(address[] memory, uint256[] memory){
        return (intToCampaign[_idx].donators,intToCampaign[_idx].donation);
    }

}