import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Comparison from './Comparison';
const CSSBattle = () => {
  const [combinedCode, setCombinedCode] = useState('');
  const [remainingHeight, setRemainingHeight] = useState(0);
  const location = useLocation();
  const targetImage = location.state?.targetImage; // Retrieve the targetImage from the location state

  useEffect(() => {
    const calculateRemainingHeight = () => {
      const headerHeight = document.getElementById('header')?.offsetHeight || 0;
      const headerHeight2 = document.getElementById('header2')?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      const availableHeight = windowHeight - headerHeight -headerHeight2 ;
      setRemainingHeight(availableHeight);
    };

    // Calculate height on initial render
    calculateRemainingHeight();

    // Recalculate height when window is resized
    window.addEventListener('resize', calculateRemainingHeight);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', calculateRemainingHeight);
    };
  }, []);
  return (
    <div className="h-[calc(100vh-7rem)] bg-gray-600 ">
      <div className="flex flex-wrap justify-between  ">
        <div className="w-full sm:w-[40%]">
          <CodeEditor onChange={setCombinedCode} height={remainingHeight} />
        </div>
        <div className="w-full sm:w-[30%]">
          <Output combinedCode={combinedCode} targetImage={targetImage} height={remainingHeight} />
        </div>
        <div className="w-full sm:w-[30%]">
          <Comparison targetImage={targetImage} />
        </div>
      </div>
    </div>
  );
};

export default CSSBattle;
