import React from 'react';

const ProgressLoader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-duck-nature/20">
      <div className="h-full bg-duck-nature animate-progress-loading" />
    </div>
  );
};

export default ProgressLoader; 