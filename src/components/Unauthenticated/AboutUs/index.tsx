import { Box } from '@mui/material';

import FAQ from './FAQ';
import Features from './Features';
import Instruction from './Instruction';

export default function AboutUs() {
  return (
    <Box
      sx={{
        pb: 8,
      }}
    >
      <Instruction />

      <Features />

      <FAQ />
    </Box>
  );
}
