import React, { useEffect, useRef, useState } from 'react';

const Output = ({ combinedCode, targetImage }) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (iframeRef.current && combinedCode) {
      const document = iframeRef.current.contentDocument;

      // Extract the CSS between <style> tags
      const cssMatch = combinedCode.match(/<style>([\s\S]*?)<\/style>/i);
      const cssCode = cssMatch ? cssMatch[1] : '';

      // Remove the CSS part from the combinedCode to get pure HTML
      const htmlCode = combinedCode.replace(/<style>[\s\S]*?<\/style>/gi, '');

      const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <style>
            body { margin: 0; padding: 0; }
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
        </body>
        </html>
      `;

      document.open();
      document.write(content);
      document.close();
    }
  }, [combinedCode]);

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full flex flex-col p-4" onMouseUp={handleMouseUp}>
      <h3 className="text-lg font-semibold mb-2 text-center">Output</h3>
      <div
        ref={containerRef}
        className="relative w-full max-w-[700px] m-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        <img src={targetImage} alt="targetImage" />
        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"         
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        {/* Vertical line indicator */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-gray-400 cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-gray-400  absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};

export default Output;
