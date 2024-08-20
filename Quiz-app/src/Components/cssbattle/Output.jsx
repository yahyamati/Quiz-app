import React, { useEffect, useRef, useState } from 'react';

const Output = ({ combinedCode, targetImage }) => {
  const iframeRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(100); // Default position at 100%
  const [isHovered, setIsHovered] = useState(false); // State for slider visibility
  const [initialPosition, setInitialPosition] = useState(100); // Track initial position
  const [isAnimating, setIsAnimating] = useState(false); // State for animation
  const [opacity, setOpacity] = useState(1); // State for opacity

  useEffect(() => {
    if (iframeRef.current && combinedCode) {
      const document = iframeRef.current.contentDocument;

      if (document) {
        // Extract the CSS from the combinedCode
        const cssMatch = combinedCode.match(/<style>([\s\S]*?)<\/style>/i);
        const cssCode = cssMatch ? cssMatch[1] : '';
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
    }
  }, [combinedCode]);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
    setOpacity(0.9); // Set opacity to 0.9 while moving
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setOpacity(1); // Set opacity to 1 when mouse enters
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    // Start the animation only if the slider is not already at the initial position
    if (sliderPosition !== initialPosition) {
      setIsAnimating(true); // Trigger animation
      setSliderPosition(initialPosition); // Start animation to reset position

      // Reset animation state after transition duration
      setTimeout(() => {
        setIsAnimating(false);
        setOpacity(1); // Reset opacity to 1 after animation completes
      }, 500); // Match this duration with the CSS transition duration
    } else {
      setOpacity(1); // Reset opacity if not animating
    }
  };

  return (
    <div
      className="w-full flex flex-col p-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="text-lg font-semibold mb-2 text-center">Output Comparison</h3>
      <div className="relative w-full max-w-[700px] m-auto overflow-hidden">
        <img src={targetImage} alt="Target" className="w-full h-auto" />
        <div
          className={`absolute top-0 left-0 right-0 h-full border ${isAnimating ? 'transition-clip' : ''}`}
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            backgroundColor: `rgba(255, 255, 255, ${opacity})`, // Apply opacity
            zIndex: 10,
            transition: isAnimating ? 'clip-path 0.5s ease-in-out' : 'none' // Smooth transition only when animating
          }}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="Output Frame"
          />
        </div>
        {/* Slider container */}
        <div
          className={`absolute top-0 left-0 right-0 h-full ${isHovered ? 'cursor-ew-resize' : ''}`}
          onMouseMove={handleMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          style={{ zIndex: 20 }}
        >
          {isHovered && (
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gray-400"
              style={{ right: `calc(${100 - sliderPosition}% - 1px)` }} // Position on the right edge
            >
              <div className="bg-gray-400 absolute rounded-full h-4 w-4 -right-2 top-1/2 transform -translate-y-1/2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Output;
