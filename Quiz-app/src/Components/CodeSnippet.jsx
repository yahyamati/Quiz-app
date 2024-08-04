import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from 'react-icons/fa';
const CodeSnippet = ({ codeString,language }) => {
    return (
      <div className=" rounded-lg shadow-xl p-2 border">
        <div className="flex justify-between items-center text-black rounded-t-lg ">
        <span className=" underline font-bold">Code Example : </span>
        <button
          className="mx-2"
          onClick={() => {navigator.clipboard.writeText(codeString)
            toast.success('Code copied to clipboard!');
          }

          }
        >
          <FaCopy className="size-6"/>
        </button>
      </div>
        <SyntaxHighlighter language={language} style={oneDark} className="rounded-b-lg bg-slate-900 overflow-scroll text-xs md:text-lg overflow-x-auto w-64 2xs:w-80 xs:w-full" >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  };
export default CodeSnippet; 