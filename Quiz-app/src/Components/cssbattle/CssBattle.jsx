import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Comparison from './Comparison';

const CSSBattle = () => {
  const [combinedCode, setCombinedCode] = useState('');
  const targetImage = '/src/content/4.png'; // Replace with your target image path

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap justify-between">
        {/* Make CodeEditor take 50% of the page width and remove padding on the left */}
        <div className="w-full sm:w-[50%] pl-0 p-2">
          <CodeEditor onChange={setCombinedCode} />
        </div>
        {/* Adjust Output and Comparison to take the remaining space */}
        <div className="w-full sm:w-[25%] p-2">
          <Output combinedCode={combinedCode} targetImage={targetImage} />
        </div>
        <div className="w-full sm:w-[25%] p-2">
          <Comparison targetImage={targetImage} />
        </div>
      </div>
    </div>
  );
};

export default CSSBattle;
