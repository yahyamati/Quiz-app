// Loading.js
import React from 'react';
import { assets } from './assets/assets';

const Loading = () => (
    <div className="flex flex-col justify-center items-center h-screen">
    <div className="relative w-16 h-16">
    <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-gray-800 animate-pulse flex items-center justify-center">
      <img src={assets.logo} alt="logo" className='bg-gray-300 rounded-full' />
    </div>
    <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-gray-800 animate-spin"></div>
    </div>
    <div className="mt-5 text-2xl text-gray-800 font-sans uppercase text-center">
      Loading...
    </div>
  </div>
  
);

export default Loading;
