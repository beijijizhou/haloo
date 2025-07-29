export async function fileToBase64(file: File): Promise<string> {
  // Validate file type
  if (!file.type.match(/^image\/(png)$/)) {
    throw new Error('Only PNG images are supported');
  }

  // Validate file size (<5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image size exceeds 5MB limit');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to Base64'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsDataURL(file);
  });
}