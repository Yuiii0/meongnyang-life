import React, { useState } from "react";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
  className?: string;
  srcSet?: string;
  sizes?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  src,
  alt,
  loading = "lazy",
  className = "",
  srcSet,
  sizes,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`relative ${className} aspect-w-1 aspect-h-1`}>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gray-100 transition-opacity duration-300 rounded-md ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        onLoad={handleLoad}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 rounded-md ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading={loading}
      />
    </div>
  );
};

export default PlaceholderImage;
