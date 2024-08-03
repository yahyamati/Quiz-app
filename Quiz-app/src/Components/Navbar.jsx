import React from 'react';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">
          <img src={assets.logo} alt="Logo" className="h-12 md:h-16 w-auto" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
