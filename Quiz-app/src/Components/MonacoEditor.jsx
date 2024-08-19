import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const defaultCode = `
<div></div>
<style>
  div {
    width: 100px;
    height: 100px;
    background: #dd6b4d;
    position: absolute;
    top: 100px;
  }
</style>
`;

const MonacoEditor = () => {
  const [code, setCode] = useState(localStorage.getItem('designCode') || defaultCode);
  const iframeRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('designCode', code);
  }, [code]);

  useEffect(() => {
    const iframe = iframeRef.current;
    const document = iframe.contentDocument;
    const styleTag = document.querySelector('style');
    const bodyTag = document.querySelector('body');

    const [htmlCode, cssCode] = code.split(/<style>([\s\S]*?)<\/style>/);

    styleTag.innerHTML = cssCode || '';
    bodyTag.innerHTML = htmlCode || '';
  }, [code]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-2">
        <Editor
          height="75vh"
          defaultLanguage="html"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />
      </div>
      <div className="w-1/2 p-2 bg-gray-200 h-[75vh]">
        <div className="w-[45vh] h-[35vh] bg-white border border-gray-400 rounded-lg overflow-hidden">
          <iframe
            ref={iframeRef}
            title="output"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default MonacoEditor;
