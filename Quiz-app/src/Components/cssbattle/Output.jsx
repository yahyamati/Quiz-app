import React, { useEffect, useRef, useState } from 'react';

const Output = ({ combinedCode, targetImage }) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [outputWidth, setOutputWidth] = useState('50%'); // Initial width for the output area
  const [linePosition, setLinePosition] = useState('50%'); // Initial line position

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

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;

      // Calculate the clamped position for the vertical line
      const containerWidth = containerRect.width;
      const clampedLeft = Math.max(0, Math.min(mouseX, containerWidth));

      // Update the output width and line position
      const newWidthPercentage = (clampedLeft / containerWidth) * 100;
      setOutputWidth(`${newWidthPercentage}%`);
      setLinePosition(`${clampedLeft}px`);
    }
  };

  const handleMouseEnter = () => {
    document.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseLeave = () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };

  return (
    <div className="flex flex-col w-[400px] h-[300px] p-4">
      <h3 className="text-lg font-semibold mb-2">Output</h3>
      <div
        ref={containerRef}
        className="relative border border-gray-300 rounded w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url(${targetImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: outputWidth }}
        >
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        {/* Vertical line indicator */}
        <div
          className="absolute top-0 h-full w-1 bg-gray-500"
          style={{ left: linePosition }}
        />
      </div>
    </div>
  );
};

export default Output;
