import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCarousel = ({ images, projectName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    console.log('Images array:', images);
    console.log('Current image path:', images[currentIndex]);
  }, [images, currentIndex]);

  if (!images || images.length === 0) {
    console.log('No images provided for:', projectName);
    return null;
  }

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const previousImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToImage = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <div className="relative w-full h-48 md:h-64">
      {/* Carousel wrapper */}
      <div className="relative h-full overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full duration-700 ease-in-out transition-all ${
              currentIndex === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            <img
              src={image}
              alt={`${projectName} screenshot ${index + 1}`}
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      {images.length > 1 && (
        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToImage(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-current={currentIndex === index}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previousImage}
            disabled={isTransitioning}
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50 group-focus:ring-4 group-focus:ring-white/75 group-focus:outline-none">
              <ChevronLeft className="w-6 h-6 text-white" />
            </span>
          </button>

          <button
            type="button"
            onClick={nextImage}
            disabled={isTransitioning}
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 group-hover:bg-black/50 group-focus:ring-4 group-focus:ring-white/75 group-focus:outline-none">
              <ChevronRight className="w-6 h-6 text-white" />
            </span>
          </button>
        </>
      )}

      {/* Loading state */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-50">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;