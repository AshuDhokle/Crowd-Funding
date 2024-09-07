import { useState,useContext } from 'react'
import './App.css'
import {CrowdFundingContext} from './context/crowdFundingContext'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './pages/Navbar/Navbar';
import CampaignDetailPage from './pages/Campaign';
import { Footer } from './Components/Footer/Footer'
function App() {
  const {account} = useContext(CrowdFundingContext); 
  return (
    <div>
      <Navbar/>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/:id' element={<CampaignDetailPage/>}/>        
     </Routes> 
     <Footer/>
    </div>
  )
}

export default App
