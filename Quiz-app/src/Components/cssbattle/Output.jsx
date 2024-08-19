import React, { useEffect, useRef } from 'react';

const Output = ({ combinedCode }) => {
  const iframeRef = useRef(null);

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

  return (
    <div className="flex flex-col w-full p-4">
      <h3 className="text-lg font-semibold mb-2">Output</h3>
      <iframe
        ref={iframeRef}
        className="border border-gray-300 rounded w-full min-h-[300px]"
      />
    </div>
  );
};

export default Output;
