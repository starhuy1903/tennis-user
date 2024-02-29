import { Box, CircularProgress } from '@mui/material';

export default function CenterLoading({ width = '100%', height = '100vh' }: { width?: string; height?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { width },
        height: { height },
      }}
    >
      <CircularProgress />
    </Box>
  );
}
