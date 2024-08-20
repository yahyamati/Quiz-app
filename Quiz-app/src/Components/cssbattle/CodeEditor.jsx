import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ onChange, height }) => {
  const [code, setCode] = useState(`
<div></div>
<style>
  div {
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
  `);

  const [fontSize, setFontSize] = useState(14);
  const [showFontSize, setShowFontSize] = useState(false);
  const fontSizeRef = useRef(null);

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
    // Set attributes for textarea
    const textarea = editor.getDomNode().querySelector('textarea');
    if (textarea) {
      textarea.setAttribute('autocorrect', 'off');
      textarea.setAttribute('autocapitalize', 'off');
      textarea.setAttribute('translate', 'no');
      textarea.setAttribute('contenteditable', 'true');
      textarea.setAttribute('aria-autocomplete', 'list');
      textarea.setAttribute('aria-multiline', 'true');
    }

    // Configure the editor for suggestions
    editor.updateOptions({
      wordBasedSuggestions: true, // Enable word-based suggestions
      quickSuggestions: {
        other: true,
        comments: true,
        strings: true,
      },
    });
  };

  // Click outside to close the font size settings panel
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
      {/* Navbar */}
      <div className="bg-gray-800 text-white py-1 px-2 border-t border-gray-600">
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

      {/* Font Size Settings */}
      {showFontSize && (
        <div
          ref={fontSizeRef} // Attach ref to the font size settings panel
          className="absolute top-12 right-4 bg-gray-700 text-white p-4 rounded-md shadow-lg transition-opacity duration-300"
          style={{
            opacity: showFontSize ? 1 : 0,
            zIndex: 100, // Ensure it is above everything else
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

      {/* Editor */}
      <Editor
        height={`${height}px`}
        className="p-1 bg-slate-800 "
        defaultLanguage="html"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{ fontSize }}
        editorDidMount={editorDidMount} // Set the attributes and configure suggestions when editor mounts
      />
    </div>
  );
};

export default CodeEditor;
