import React from 'react'
import Campaings from '../Components/Campaings'
import HeroSection from '../Components/HeroSection'
import CreateCampaign from '../Components/CreateCampaign'

const Home = () => {

     
    return (
    <div className='w-full bg-gradient-to-r from-sky-400 to-violet-400'>
      <HeroSection/>
      <Campaings/>
      <CreateCampaign/>

      {/* Footer */}
      
    </div>
  )
}

export default Home