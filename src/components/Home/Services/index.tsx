import { Box } from '@mui/material';
import { useAppSelector } from 'store';

export default function Services() {
  const { services } = useAppSelector((state) => state.app);

  console.log({ services });

  return <Box>Services</Box>;
}
