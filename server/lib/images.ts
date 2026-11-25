/**
 * Shrinks uploaded images before they are saved: at most 2000px wide,
 * re-encoded at web quality, and only kept if the result is smaller.
 * GIFs (may be animated) and AVIFs are stored unchanged. If the image library
 * is missing or fails, the original file is used.
 */
const MAX_WIDTH = 2000;

export interface OptimisedImage {
  buffer: Buffer;
  optimised: boolean;
  width?: number;
  height?: number;
}

export async function optimiseImage(input: Buffer, mimeType: string): Promise<OptimisedImage> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(mimeType)) return { buffer: input, optimised: false };
  try {
    const { default: sharp } = await import('sharp');
    const image = sharp(input, { failOn: 'error' }).rotate(); // apply EXIF orientation
    const meta = await image.metadata();
    if (meta.width && meta.width > MAX_WIDTH) image.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    const encoded =
      mimeType === 'image/jpeg'
        ? image.jpeg({ quality: 82, mozjpeg: true })
        : mimeType === 'image/png'
          ? image.png({ compressionLevel: 9, palette: true, quality: 90 })
          : image.webp({ quality: 82 });
    const { data, info } = await encoded.toBuffer({ resolveWithObject: true });
    if (data.length >= input.length) {
      return { buffer: input, optimised: false, width: meta.width, height: meta.height };
    }
    return { buffer: data, optimised: true, width: info.width, height: info.height };
  } catch (err) {
    console.warn('[images] optimisation skipped:', (err as Error).message);
    return { buffer: input, optimised: false };
  }
}
