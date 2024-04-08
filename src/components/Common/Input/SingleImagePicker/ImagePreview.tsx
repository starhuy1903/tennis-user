import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Box, IconButton } from '@mui/material';
import { useMemo } from 'react';

interface ImagePreviewProps {
  image: File | null;
  onDeleteImage: (file: File) => void;
  disabled?: boolean;
}

export default function ImagePreview({
  image,
  onDeleteImage,
  disabled = false,
}: ImagePreviewProps) {
  const renderedImg = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return '';
  }, [image]);

  if (!image) {
    return null;
  }

  return (
    <Box
      height={180}
      width={320}
      borderRadius={4}
      overflow="hidden"
      border="1px solid #ccc"
      position="relative"
      sx={{ opacity: disabled ? 0.5 : 1 }}
    >
      <img
        src={renderedImg}
        alt=""
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
      <IconButton
        aria-label="close"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
        onClick={() => onDeleteImage(image)}
        disabled={disabled}
      >
        <CloseSharpIcon color="action" fontSize="small" />
      </IconButton>
    </Box>
  );
}
