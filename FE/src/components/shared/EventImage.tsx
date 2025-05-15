import React, { useState } from 'react';

interface EventImageProps {
  src: string;
  alt: string;
  className?: string;
}

const EventImage: React.FC<EventImageProps> = ({ src, alt, className }) => {
  const [imgError, setImgError] = useState(false);
  return imgError ? (
    <span className={`text-4xl flex items-center justify-center w-full h-full ${className || ''}`}>🦆</span>
  ) : (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className || ''}`}
      loading="lazy"
      onError={() => setImgError(true)}
    />
  );
};

export default EventImage; 