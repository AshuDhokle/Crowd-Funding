import React from 'react'
import CreateCampaignForm from './CreateCampaignForm'
const CreateCampaign = () => {

  
  return (
    <section className="p-10 flex flex-col md:flex-row items-center justify-center bg-blue-500 py-16 text-white text-center">
        <div>
        <h2 className="text-4xl font-bold mb-4">Start your campaign today!</h2>
        <p className="text-lg mb-6">Create a campaign in minutes and start raising funds for your cause.</p>
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
          Create a Campaign
        </button>
        </div>
        <CreateCampaignForm/>
      </section>
  )
}

export default CreateCampaign