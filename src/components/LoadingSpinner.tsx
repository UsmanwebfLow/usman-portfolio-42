import React, { useState, useEffect } from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add a slight delay for smooth transition
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`loading-container ${!isLoading ? 'fade-out' : ''}`}>
      <div className="loader">
        <div className="text"><span>U</span></div>
        <div className="text"><span>S</span></div>
        <div className="text"><span>M</span></div>
        <div className="text"><span>A</span></div>
        <div className="text"><span>N</span></div>
        <div className="text"><span>A</span></div>
        <div className="text"><span>L</span></div>
        <div className="text"><span>I</span></div>
        <div className="text"><span>.</span></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;