import React from 'react'
import BrandLogo from './common/BrandLogo';

const Navbar = () => {
  return (
    <div className="w-100 bg-navbar border-b">
      <div className="container mx-auto py-4">
        <BrandLogo />
      </div>
    </div>
  )
}

export default Navbar;
