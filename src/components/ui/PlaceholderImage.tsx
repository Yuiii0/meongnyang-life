import React, { useState } from "react";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
  className?: string;
  width: number;
  height: number;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  src,
  alt,
  loading = "lazy",
  className = "",
  width,
  height,
}) => {
  const [loaded, setLoaded] = useState(false);
  const placeholderSrc = `https://via.placeholder.com/${width}x${height}`;

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="relative w-full h-auto">
      <img
        src={placeholderSrc}
        alt={`${alt} placeholder`}
        className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={`relative w-full h-auto object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        loading={loading}
      />
    </div>
  );
};

export default PlaceholderImage;
