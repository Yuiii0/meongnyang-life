export const getCroppedImg = (
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number }
): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("2D 컨텍스트를 가져오는 데 실패했습니다");
        reject(new Error("2D 컨텍스트를 가져오는 데 실패했습니다"));
        return;
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const croppedWidth = crop.width * scaleX;
      const croppedHeight = crop.height * scaleY;

      canvas.width = croppedWidth;
      canvas.height = croppedHeight;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        croppedWidth,
        croppedHeight,
        0,
        0,
        croppedWidth,
        croppedHeight
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("캔버스가 비어 있습니다");
          reject(new Error("캔버스가 비어 있습니다"));
          return;
        }
        (blob as any).name = "croppedImage.jpeg";
        resolve(blob);
      }, "image/jpeg");
    };

    image.onerror = (error) => reject(error);
  });
};
