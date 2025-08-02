export const removeBackground = async (imageUrl: string | null): Promise<string | null> => {
  if (!imageUrl) {
    console.log('removeBackground: No URL provided, returning null');
    return null;
  }

  console.log('removeBackground: Starting background removal for', imageUrl);
  try {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = () => {
        console.log('removeBackground: Image loaded successfully');
        resolve("Image loaded");
      };
      img.onerror = () => {
        console.error('removeBackground: Failed to load image');
        reject(new Error('Failed to load image'));
      };
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('removeBackground: Canvas context not available');
      throw new Error('Canvas context not available');
    }

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r > 200 && g > 200 && b > 200) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const processedBase64 = canvas.toDataURL('image/png');
    console.log('removeBackground: Processed image, returning:', processedBase64.slice(0, 30) + '...');
    return processedBase64;
  } catch (error) {
    console.error('removeBackground: Failed to remove background:', error);
    return null;
  }
};