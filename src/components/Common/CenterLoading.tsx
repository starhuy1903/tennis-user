import { Box, CircularProgress } from '@mui/material';

export default function CenterLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
