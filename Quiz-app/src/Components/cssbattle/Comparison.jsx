import React from 'react';

const Comparison = ({ targetImage }) => {
  return (
    <div className="flex flex-col w-full h-full ">
      {/* Navbar */}
      <div className="bg-gray-800 text-white p-1 px-2 border-t border-s border-gray-600">
        <h3 className="text-xl font-semibold text-center">Recreate this Image</h3>
        {/* Add any additional navbar items here */}
      </div>
      
      {/* Content Wrapper */}
      <div className="h-full w-full max-w-full p-2 bg-gray-800 ">
        {/* Target Image */}
        <img
          src={targetImage}
          alt="Target"
          className=" w-full  "
         
        />
      </div>
    </div>
  );
};

export default Comparison;
