import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const CodeSnippet = ({ codeString, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="rounded-lg shadow-xl p-2 border relative">
      <div className="flex justify-between items-center text-black rounded-t-lg">
        <span className="underline font-bold">Code Example :</span>
        <button
          className="mx-2 relative"
          onClick={handleCopy}
          data-tooltip-id="copy-tooltip"
          data-tooltip-content={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        className="rounded-b-lg bg-slate-900 overflow-scroll text-xs md:text-lg overflow-x-auto w-64 2xs:w-80 xs:w-full"
      >
        {codeString}
      </SyntaxHighlighter>
      <Tooltip id="copy-tooltip" place="top" />
    </div>
  );
};

export default CodeSnippet;
 