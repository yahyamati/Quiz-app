import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Comparison from './Comparison';

const CSSBattle = () => {
  const [combinedCode, setCombinedCode] = useState('');
  const location = useLocation();
  const targetImage = location.state?.targetImage; // Retrieve the targetImage from the location state

  return (
    <div className="  py-8 h-[80vh] bg-gray-600 ">
      <h1 className="text-2xl text-white font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl mx-auto table">
                  Test Your CSS SKills
      </h1>
      <div className="flex flex-wrap justify-between ">
        <div className="w-full sm:w-[40%] p-2">
          <CodeEditor onChange={setCombinedCode} />
        </div>
        <div className="w-full sm:w-[30%] p-2 flex justify-center items-center">
          <Output combinedCode={combinedCode} targetImage={targetImage} />
        </div>
        <div className="w-full sm:w-[30%] p-2 flex justify-center items-center">
          <Comparison targetImage={targetImage} />
        </div>
      </div>
    </div>
  );
};

export default CSSBattle;
