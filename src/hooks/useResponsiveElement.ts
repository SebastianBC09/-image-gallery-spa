import { useState, useEffect } from 'react';

export const useResponsiveElement = (element: JSX.Element) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Check screen size on initial render
    checkScreenSize();

    // Add event listener to detect screen size changes
    window.addEventListener('resize', checkScreenSize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isSmallScreen ? element : null;
};