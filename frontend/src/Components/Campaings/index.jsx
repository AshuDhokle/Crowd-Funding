import React from 'react'
import { useContext } from 'react'
import { CrowdFundingContext } from '../../context/crowdFundingContext'
import CampaignCard from './CampaignCard'

const Campaings = () => {
    const {campaigns} = useContext(CrowdFundingContext)
    
    return (
      <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Featured Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.length > 0 ? (
            campaigns.map((campaign,idx) => (
              <CampaignCard key={idx} campaign={campaign} idx={idx} />
            ))
          ) : (
            <p className="text-center col-span-full">No campaigns available at the moment</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Campaings