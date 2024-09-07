import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-96" >
        <div className="absolute inset-0 bg-sky-500 bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Fund the Future</h1>
          <p className="text-xl mb-6">Support campaigns that matter and help them reach their goals.</p>
          <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full" 
          onClick={()=>{window.scrollTo({top:400,behavior:'smooth'})}}
          >
            Get Started
          </button>
        </div>
      </section>
  )
}

export default HeroSection