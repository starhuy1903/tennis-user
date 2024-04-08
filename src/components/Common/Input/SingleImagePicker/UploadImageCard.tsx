import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button } from '@mui/material';

interface UploadImageCardProps {
  open: () => void;
  disabled?: boolean;
}

export default function UploadImageCard({
  open,
  disabled,
}: UploadImageCardProps) {
  return (
    <Box
      border="2px dashed #ccc"
      borderRadius={4}
      sx={{ borderColor: 'primary.main' }}
      height={180}
      width={320}
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <CloudUploadIcon color="primary" fontSize="large" />
      <Button disabled={disabled} onClick={open}>
        Browse image
      </Button>
    </Box>
  );
}
