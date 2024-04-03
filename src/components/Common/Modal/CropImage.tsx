import { Box } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { useDebounceEffect } from 'hooks/useDebounceEffect';
import { canvasPreview } from 'utils/canvasPreview';

import BaseModal from './BaseModal';

// const ORIENTATION_TO_ANGLE = {
//   '3': 180,
//   '6': 90,
//   '8': -90,
// };

const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
};

interface CropImageProps {
  image: File;
  aspect: number;
  onSubmit: (file: File) => void;
  onModalClose: () => void;
}

export default function CropImage({ image, aspect, onSubmit, onModalClose }: CropImageProps) {
  const imageObjURL = useMemo(() => URL.createObjectURL(image), [image]);
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotate, setRotate] = useState(0);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const handleCropImage = useCallback(async () => {
    const originalImage = imgRef.current;
    const previewCanvas = previewCanvasRef.current;

    if (!originalImage || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = originalImage.naturalWidth / originalImage.width;
    const scaleY = originalImage.naturalHeight / originalImage.height;

    const offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: image.type,
    });

    onSubmit(new File([blob], image.name, { type: image.type }));
    onModalClose();
  }, [completedCrop, onSubmit, onModalClose, image]);

  useEffect(() => {
    (async () => {
      if (!image) {
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(image);
    })();
  }, [image]);

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, 1, rotate);
      }
    },
    100,
    [completedCrop, rotate],
  );

  const body = (
    <Box>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          minHeight={100}
        >
          <img
            ref={imgRef}
            src={imageObjURL}
            alt="crop"
            style={{ transform: `rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <canvas
          ref={previewCanvasRef}
          style={{ display: 'none' }}
        />
      )}
    </Box>
  );

  return (
    <BaseModal
      headerText="Crop Image"
      onModalClose={onModalClose}
      body={body}
      primaryButtonText="Crop"
      onClickPrimaryButton={handleCropImage}
      disabledPrimaryButton={false}
    />
  );
}
