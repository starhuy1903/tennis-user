import { Box } from '@mui/material';

export const WrapperContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      my={4}
      minHeight={200}
    >
      {children}
    </Box>
  );
};
