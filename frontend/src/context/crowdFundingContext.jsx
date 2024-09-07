import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Abi } from '../utils/crowdFundingAbi'; // Replace with your ABI

// Create Context
export const CrowdFundingContext = createContext();

export const CrowdFundingProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [donators, setDonators] = useState([]);
    const [donations, setDonations] = useState([]);
    const contractAddress = '0xa1628e266cd5d9c5accd0558d8f12f1b7ab51f39'; // Replace with your contract address
    
    // Initialize blockchain connection
    useEffect(() => {
        const initBlockchain = async () => {
            if (window.ethereum) {
                try {
                    let _provider = new ethers.providers.Web3Provider(window.ethereum);
                    setProvider(_provider);
                    
                    const _signer = _provider.getSigner();
                    setSigner(_signer);
                    
                    const _contract = new ethers.Contract(contractAddress, Abi, _signer);
                    setContract(_contract);
                    
                    // Request user's account
                    const accounts = await _provider.send("eth_requestAccounts", []);
                    setAccount(accounts[0]);
                    
                    // Fetch all campaigns
                    const fetchAllCampaigns = async() =>{
                        if (_contract) {
                            try {
                                const campaignsData = await _contract.getAllCampaign();  
                                setCampaigns(campaignsData);
                            } catch (error) {
                                console.error("Error fetching campaigns:", error);
                            }
                        }
                    }
                    
                    await fetchAllCampaigns();
                } catch (error) {
                    console.error("Error initializing blockchain:", error);
                }
            } else {
                console.error("Ethereum provider not found. Please install MetaMask.");
            }
        };

        initBlockchain();
    }, [contractAddress]);

    // Fetch all campaigns from the contract
    
    
    const fundCampaign = async (campaignId, amount) => {
        if (contract) {
            
            try {
                const tx = await contract.fund(campaignId, { value: ethers.utils.parseEther(amount) });
                await tx.wait();
                fetchAllCampaigns(); // Update campaigns after funding
            } catch (error) {
                console.error("Error funding campaign:", error);
            }
        }
    };

    
    const createCampaign = async (_name, _description, _image, _target) => {
        if (contract) {
            try {
                const tx = await contract.createCampaign(_name, _description, _image, ethers.utils.parseEther(_target), account);
                await tx.wait();
                fetchAllCampaigns(); // Update campaigns after creation
            } catch (error) {
                console.error("Error creating campaign:", error);
            }
        }
    };
    
    const withdrawFunds = async (campaignId) => {
        if (contract) {
            try {
                const tx = await contract.withdraw(campaignId);
                await tx.wait();
                fetchAllCampaigns(); // Update campaigns after withdrawal
            } catch (error) {
                console.error("Error withdrawing funds:", error);
            }
        }
    };
    const fetchDonators = async (campaignId) => {
        if (contract) {
            
            try {
                const [donatorsList, donationsList] = await contract.getAllDonators(campaignId);
                setDonators(donatorsList);
                setDonations(donationsList);
            } catch (error) {
                console.error("Error fetching donators:", error);
            }
        }
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                account,
                campaigns,
                createCampaign,
                fundCampaign,
                withdrawFunds,
                fetchDonators,
                donators,
                donations,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};
