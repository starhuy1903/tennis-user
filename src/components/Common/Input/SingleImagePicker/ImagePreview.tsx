import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Box, IconButton } from '@mui/material';

interface ImagePreviewProps {
  imageUrl: string;
  onDeleteImage: () => void;
  disabled?: boolean;
}

export default function ImagePreview({ imageUrl, onDeleteImage, disabled = false }: ImagePreviewProps) {
  if (!imageUrl) {
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
        src={imageUrl}
        alt="preview-upload-image"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
      <IconButton
        aria-label="close"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
        onClick={onDeleteImage}
        disabled={disabled}
      >
        <CloseSharpIcon
          color="action"
          fontSize="small"
        />
      </IconButton>
    </Box>
  );
}
