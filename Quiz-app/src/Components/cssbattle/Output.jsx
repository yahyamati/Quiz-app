import React, { useEffect, useRef, useState } from 'react';

const Output = ({ combinedCode, targetImage }) => {
  const iframeRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(100); // Default position at 100%
  const [isHovered, setIsHovered] = useState(false); // State for slider visibility
  const [initialPosition, setInitialPosition] = useState(100); // Track initial position
  const [isAnimating, setIsAnimating] = useState(false); // State for animation
  const [opacity, setOpacity] = useState(1); // State for opacity
  const [isDragging, setIsDragging] = useState(false); // State for dragging
  const [sliderEnabled, setSliderEnabled] = useState(true); // State for slider enabled/disabled

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
    if (!sliderEnabled) return; // Do nothing if slider is disabled

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
    setOpacity(0.9); // Set opacity to 0.9 while moving
  };

  const handleTouchMove = (event) => {
    if (!sliderEnabled) return; // Do nothing if slider is disabled

    const touch = event.touches[0];
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
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

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Reset slider position to initial position on touch end
    setSliderPosition(initialPosition);
  };

  const toggleSlider = () => {
    setSliderEnabled(prev => !prev);
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      {/* Navbar */}
      <div className="bg-gray-800 p-1 px-2 border-t border-s border-gray-600">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-white">Code Output</h3>
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sliderEnabled}
                onChange={toggleSlider}
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-white">Slide & Compare</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-2 bg-gray-800 ">
        <div
          className="relative w-full max-w-[700px] m-auto overflow-hidden "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
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
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            style={{ zIndex: 20 }}
          >
            {isHovered && sliderEnabled && (
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
    </div>
  );
};

export default Output;
