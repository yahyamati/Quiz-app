import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Comparison from './Comparison';
import ImageComparisonSlider from './ImageComparisonSlider';

const CSSBattle = () => {
  const [combinedCode, setCombinedCode] = useState('');

  const targetImage = '/src/content/3.png'; // Replace with your target image path

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">CSS Battle</h2>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <CodeEditor onChange={setCombinedCode} />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
          <Output combinedCode={combinedCode} />
        </div>
        <div className="w-full lg:w-1/3 p-2">
          <Comparison targetImage={targetImage} />
          <ImageComparisonSlider
        targetImageSrc={targetImage}
        combinedCode={combinedCode}
      />
        </div>
      </div>
    </div>
  );
};

export default CSSBattle;
