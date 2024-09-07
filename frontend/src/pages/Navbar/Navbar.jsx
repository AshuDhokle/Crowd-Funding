import React from 'react'
import { useContext } from 'react'
import { CrowdFundingContext } from '../../context/crowdFundingContext'
import { shortenAddress } from '../../utils/shortenAddress'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const {account} = useContext(CrowdFundingContext);
  
  return (
    <div className=' w-full p-2 py-4 flex flex-row items-center justify-between'>
      <Link to={'/'} className='text-blue-700 text-xl font-semibold'>Give-Rise</Link>
      <h1 className='text-sky-500 hover:text-sky-600 cursor-pointer'>Account: {shortenAddress(account)}</h1>    
    </div>
  )
}

export default Navbar