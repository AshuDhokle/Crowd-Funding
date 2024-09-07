import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Your Crowdfunding Platform. All Rights Reserved.</p>
        </div>
    </footer>
  )
}
