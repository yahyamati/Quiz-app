import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onChange, height }) => {

  const defaultCode = `
<div></div>
<style>
  div {
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
  `;
  const [code, setCode] = useState(() => {
    const savedCode = localStorage.getItem('savedCode');
    return savedCode || defaultCode;
  });

  const [fontSize, setFontSize] = useState(14);
  const [showFontSize, setShowFontSize] = useState(false);
  const fontSizeRef = useRef(null);


  // Save code to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('savedCode', code);
  }, [code]);

  const handleEditorChange = (value) => {
    setCode(value);
    onChange(value); // Notify parent component of the code change
  };

  const toggleFontSize = () => {
    setShowFontSize(!showFontSize);
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  const editorDidMount = (editor) => {
    const textarea = editor.getDomNode().querySelector('textarea');
    if (textarea) {
      textarea.setAttribute('autocorrect', 'off');
      textarea.setAttribute('autocapitalize', 'off');
      textarea.setAttribute('translate', 'no');
      textarea.setAttribute('contenteditable', 'true');
      textarea.setAttribute('aria-autocomplete', 'list');
      textarea.setAttribute('aria-multiline', 'true');
    }

    editor.updateOptions({
      wordBasedSuggestions: true,
      quickSuggestions: {
        other: true,
        comments: true,
        strings: true,
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fontSizeRef.current && !fontSizeRef.current.contains(event.target)) {
        setShowFontSize(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col ">
      <div id='header2' className="bg-gray-800 text-white py-1 px-2 border-t border-gray-600">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold">Editor</h3>
          <div className="flex items-center">
            <span className="text-white mr-4">{code.length} characters</span>
            <button
              className="text-white bg-gray-700 px-2 rounded-md"
              onClick={toggleFontSize}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {showFontSize && (
        <div
          ref={fontSizeRef}
          className="absolute top-12 right-4 bg-gray-700 text-white p-4 rounded-md shadow-lg transition-opacity duration-300"
          style={{
            opacity: showFontSize ? 1 : 0,
            zIndex: 100,
          }}
        >
          <div className="flex justify-between items-center">
            <span>Font Size:</span>
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) => handleFontSizeChange(Number(e.target.value))}
              className="ml-2"
            />
            <span className="ml-2">{fontSize}px</span>
          </div>
        </div>
      )}

      <Editor
        height={`${height}px`}
        className="p-1 bg-slate-800 "
        defaultLanguage="html"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{ fontSize }}
        editorDidMount={editorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
