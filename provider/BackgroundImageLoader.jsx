import { useEffect } from 'react';

const BackgroundImageLoader = () => {
  useEffect(() => {
    const bgElement = document.documentElement; // Select the <html> element

    // Array of images with increasing resolutions
    const imageResolutions = [
      '/images/auth/ultraLowBG.jpg',
      '/images/auth/lowBG.jpg', // Low-resolution image
      '/images/auth/midBG.jpg', // Mid-resolution image
      '/images/auth/highBG.jpg', // High-resolution image
      '/images/auth/BG.jpg', // Ultra-high-resolution image
    ];

    // Function to progressively load the next resolution image
    const loadNextResolutionImage = (index) => {
      const image = new Image();
      image.src = imageResolutions[index];
      console.log('Current background image is:', imageResolutions[index]);
      image.onload = () => {
        bgElement.style.backgroundImage = `url(${imageResolutions[index]})`;
        if (index < imageResolutions.length - 1) {
          loadNextResolutionImage(index + 1);
        }
      };
    };

    loadNextResolutionImage(1); // Start loading from the second image (mid-res)
  }, []);

  return null;
};

export default BackgroundImageLoader;
