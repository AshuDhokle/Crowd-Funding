import React, { useState, useEffect, useContext } from 'react';
import { CrowdFundingContext } from '../context/crowdFundingContext'; // Adjust import path as necessary
import { useParams } from 'react-router-dom';
import { shortenAddress } from '../utils/shortenAddress';
const CampaignDetailPage = () => {
  const { id } = useParams();
  const {
    fundCampaign,
    campaigns,
    account,
  } = useContext(CrowdFundingContext);
  
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [donations, setDonations] = useState([]);
  const [isOwner,setIsOwner] = useState(false);
  useEffect(() => {
    const getCampaignDetails = async () => {
      if(campaigns){
      try {
        
        setCampaign(campaigns[id]);
        console.log(campaigns[id].owner.toLowerCase());
        console.log(account.toLowerCase());
        
        if(account.toLowerCase() === campaigns[id].owner.toLowerCase()){
          setIsOwner(true);
        }
        setDonators(campaigns[id].donators);
        setDonations(campaigns[id].donation);
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      }
    }
    };


    getCampaignDetails();
  }, [id,campaigns]);

  const handleDonate = async () => {
    if (donationAmount>0) {
      try {
        
        await fundCampaign(id, donationAmount);
        setDonationAmount('');
        // Optionally refetch campaign details or donators here
      } catch (error) {
        console.error('Error donating to campaign:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-r from-cyan-500 to-blue-500">
      {campaign ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img src={campaign.image} alt={campaign.name} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            <h1 className="text-4xl font-bold text-white absolute bottom-4 left-4">{campaign.name}</h1>
          </div>
          <div className="p-8">
            <p className="text-xl mb-6">{campaign.description}</p>
            <div className="bg-gray-200 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-2">Campaign Details</h2>
              <p><strong>Target:</strong> {parseInt(campaign.target)} ETH</p>
              <p><strong>Raised:</strong> {parseInt(campaign.totalRaised)/1e18} ETH</p>
              <p><strong>Owner:</strong> {shortenAddress(campaign.owner)}</p>
              {
                isOwner && <button className='p-1 m-2 bg-blue-500 text-white rounded-md'>Withdraw</button>
              }
            </div>

            <div className="bg-gray-200 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">Donate</h2>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="border border-gray-300 p-2 mb-4 w-full rounded-lg"
                placeholder="Amount in ETH"
              />
              <button
                onClick={handleDonate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1 rounded-md"
              >
                Donate
              </button>
            </div>
            
            <div className="bg-gray-200 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Donors</h2>
              {donators.length > 0 ? (
                <ul className="space-y-2">
                  {donators.map((donator, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                      <span className="text-gray-700">{shortenAddress(donator)}</span>
                      <span className="text-gray-600">{parseInt(donations[index])/1e18} ETH</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No donors yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">Loading campaign details...</p>
      )}
    </div>
  );
};

export default CampaignDetailPage;
