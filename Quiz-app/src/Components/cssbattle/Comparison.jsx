import React from 'react';

const Comparison = ({ targetImage }) => {
  return (
    <div className="flex flex-col w-full ">
      {/* Navbar */}
      <div className="bg-gray-800 text-white p-2 rounded-t-2xl">
        <h3 className="text-xl font-semibold text-center">Recreate this Image</h3>
        {/* Add any additional navbar items here */}
      </div>
      
      {/* Content Wrapper */}
      <div className="relative w-full max-w-full ">
        {/* Target Image */}
        <img
          src={targetImage}
          alt="Target"
          className=" w-full h-auto rounded-b-2xl"
         
        />
      </div>
    </div>
  );
};

export default Comparison;
