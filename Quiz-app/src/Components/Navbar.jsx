import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="h-12 md:h-16 w-auto" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
