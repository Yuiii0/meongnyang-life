import React, { useState } from "react";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
  className?: string;
  width: number;
  height: number;
  srcSet?: string;
  sizes?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  src,
  alt,
  loading = "lazy",
  className = "",
  width,
  height,
  srcSet,
  sizes,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const paddingBottom = (height / width) * 100;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: "100%",
        paddingBottom: loaded ? "0" : `${paddingBottom}%`,
        transition: "padding-bottom 0.3s ease",
      }}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gray-100 transition-opacity duration-300  rounded-md ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ width: `${width}px`, height: `${height}px` }}
      ></div>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        onLoad={handleLoad}
        className={`relative w-full h-full object-contain transition-opacity duration-300 rounded-md ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading={loading}
      />
    </div>
  );
};

export default PlaceholderImage;
