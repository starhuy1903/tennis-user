import { Box } from '@mui/material';

interface MatchItem {
  data: any;
}

export default function MatchItem({ data }: MatchItem) {
  console.log({ data });

  return <Box>MatchItem</Box>;
}
