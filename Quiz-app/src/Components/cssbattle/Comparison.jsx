import React from 'react';

const Comparison = ({ targetImage }) => {
  return (
    <div className="flex flex-col w-full p-4">
      {/* Navbar */}
      <div className="bg-gray-800 text-white p-2">
        <h3 className="text-xl font-semibold">Recreate this target</h3>
        {/* Add any additional navbar items here */}
      </div>
      
      {/* Content Wrapper */}
      <div className="relative w-full max-w-full ">
        {/* Target Image */}
        <img
          src={targetImage}
          alt="Target"
          className="border border-gray-300 w-full h-auto"
         
        />
      </div>
    </div>
  );
};

export default Comparison;
