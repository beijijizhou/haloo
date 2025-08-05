import { removeBackground, Config } from '@imgly/background-removal';

export const highQualityRemove = async (imageUrl: string | null): Promise<string | null> => {
  if (!imageUrl) {
    console.log('removeBG: No URL provided, returning null');
    return null;
  }

  console.time('Background Removal Time');
  try {
    const config: Config = {
      publicPath: 'https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/',
      output: {
        format: 'image/png',
        quality: 0.8,
        // type: 'foreground',
      },
      debug: true,
    };

    const blob = await removeBackground(imageUrl, config);
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read blob as data URL'));
      reader.readAsDataURL(blob);
    });

    console.timeEnd('Background Removal Time');
    console.log('removeBG: Successfully processed image to Base64');
    return base64;
  } catch (error) {
    console.timeEnd('Background Removal Time');
    console.error('removeBG: Background removal failed:', error);
    return null;
  }
};