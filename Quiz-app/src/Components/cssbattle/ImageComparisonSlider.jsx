import React, { useRef, useEffect } from 'react';
import Output from './Output';
const ImageComparisonSlider = ({ targetImageSrc, combinedCode }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percentage = (offsetX / container.offsetWidth) * 100;

      slider.style.left = `${percentage}%`;
      container.querySelector('.rendered-output').style.width = `${percentage}%`;
    };

    container.addEventListener('mousemove', onMouseMove);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden border border-gray-300 rounded">

{/* Target Image */}
<img
        src="/src/content/3.png"
        alt="Target"
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      {/* Rendered Content */}
      <div className="absolute top-0 left-0 h-full w-full object-cover">  
      <Output combinedCode={combinedCode} />
      </div>

      

      {/* Slider */}
      <div
        ref={sliderRef}
        className="absolute top-0 h-full w-1 bg-gray-700 cursor-col-resize"
        style={{ left: '50%' }}
      />
    </div>
  );
};

export default ImageComparisonSlider;
