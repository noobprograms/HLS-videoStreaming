// ProgressBar.jsx
import React, { useState, useEffect } from 'react';

const ProgressBar = ({ videoRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        setProgress((currentTime / duration) * 100);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [videoRef]);

  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
