import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <nav id='header' className="bg-gray-800 p-4 md:p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-15 md:h-20  w-auto" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
