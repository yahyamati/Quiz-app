import React, { useRef, useState } from 'react';
import Output from './Output';

const ImageComparisonSlider = ({ targetImageSrc, combinedCode }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseMove = (event) => {
    if (!isDragging) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;

    // Constrain the slider position within the container's width
    const newPosition = Math.max(0, Math.min(offsetX, container.offsetWidth));
    sliderRef.current.style.left = `${newPosition}px`;

    // Adjust the rendered output width based on slider's position
    container.querySelector('.rendered-output').style.width = `${newPosition}px`;
  };

  const onMouseDown = () => {
    setIsDragging(true);
    sliderRef.current.style.opacity = '0.9';
    sliderRef.current.style.transition = 'all 0.3s';
  };

  const onMouseUp = () => {
    setIsDragging(false);
    sliderRef.current.style.opacity = '1';
    sliderRef.current.style.transition = 'all 0.3s';
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden border border-gray-300 rounded"
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave} // Stop dragging when the mouse leaves the container
      style={{ touchAction: 'none' }}
    >
      {/* Target Image */}
      <img
        src={targetImageSrc}
        alt="Target"
        className="absolute top-0 left-0 h-full w-full object-cover z-10" // Higher z-index for target image
      />

      {/* Rendered Content */}
      <div
        className="rendered-output absolute top-0 left-0 h-full object-cover z-0" // Lower z-index for rendered output
        style={{ width: '50%' }} // Initial width
      >
        <Output combinedCode={combinedCode} />
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="absolute top-0 h-full w-1 bg-gray-700 cursor-col-resize z-20"
        style={{
          left: '50%',   // Initial position
          opacity: '1',  // Initial opacity
          transition: 'opacity 0.3s', // Initial transition for opacity
        }}
      />
    </div>
  );
};

export default ImageComparisonSlider;
