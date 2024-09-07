import React from 'react';
import { shortenAddress } from '../../utils/shortenAddress';
import {Link} from 'react-router-dom'
const CampaignCard = ({ campaign,idx }) => {
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto">
      <img src={campaign.image} alt={campaign.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{campaign.name}</h2>
        <p className="text-gray-600 mb-4">{campaign.description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-green-600 font-semibold">{parseInt(campaign.totalRaised)} ETH raised</p>
          <p className="text-gray-500">Goal: {parseInt(campaign.target)} ETH</p>
        </div>
        <div className="border-t pt-4">
          <h3 className="text-gray-500 text-sm">Owned by:</h3>
          <div className='flex flex-row items-center justify-between'>
          <p className="text-blue-500 font-semibold cursor-pointer">{shortenAddress(campaign.owner)}</p>
          <Link to={`/${idx}`} className='p-1 bg-sky-400 text-white rounded-md'>Donate</Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
