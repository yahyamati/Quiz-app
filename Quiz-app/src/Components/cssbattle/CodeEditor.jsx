import React, { useState } from 'react';
import Editor from '@monaco-editor/react'; // Assuming you're using Monaco Editor

const CodeEditor = ({ onChange }) => {
  const [code, setCode] = useState(`
<div></div>
<style>
  div {
    width: 100px;
    height: 100px;
    background: #dd6b4d;
  }
</style>
  `);

  const handleEditorChange = (value) => {
    setCode(value);
    onChange(value); // Notify parent component of the code change
  };

  return (
    <div className="flex flex-col w-full p-4">
      <h3 className="text-lg font-semibold mb-2 text-center">Code Editor</h3>
      <Editor
        height="300px"
        defaultLanguage="html"
        value={code}
        onChange={handleEditorChange}
        theme='vs-dark'
        className='p-2 bg-black rounded-2xl'
      />
    </div>
  );
};

export default CodeEditor;
