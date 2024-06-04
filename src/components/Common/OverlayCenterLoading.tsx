import { Box, CircularProgress } from '@mui/material';

export default function OverlayCenterLoading() {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
