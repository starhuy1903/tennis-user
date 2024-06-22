import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

export type StatusProps = {
  status: 'success' | 'failed';
  title: string;
  description?: string;
  height?: string;
  children?: ReactNode;
};

export default function Status({ status, title, description, height = '80vh', children }: StatusProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={height}
    >
      {status === 'success' && <CheckCircleOutlineIcon sx={{ color: '#049669', fontSize: 120 }} />}
      {status === 'failed' && <ErrorOutlineIcon sx={{ color: '#F87171', fontSize: 120 }} />}

      <Typography
        variant="h4"
        gutterBottom
        mt={2}
        color={status === 'success' ? '#049669' : '#F87171'}
        textAlign="center"
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        textAlign="center"
      >
        {description}
      </Typography>

      <Box mt={2}>{children}</Box>
    </Box>
  );
}
