import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Comparison = ({ targetImage }) => {
const { id } = useParams();
  return (
    <div className="flex flex-col w-full h-full ">
      {/* Navbar */}
      <div className="bg-gray-800 text-white p-1 px-2 border-t border-s border-gray-600">
        <h3 className="text-xl font-semibold text-center">Recreate this Image : {id}</h3>
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
        <Link 
          to="/csschallenges"
          className='bg-white relative top-2 font-semibold px-4 py-2 rounded-md hover:bg-blue-900 text-black transition duration-500 ease-in-out text-center float-end hover:text-white'
        >Go back To choose</Link>
      </div>
    </div>
  );
};

export default Comparison;
