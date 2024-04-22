import { Box } from '@mui/material';

interface MatchesList {
  matches: any[];
}

export default function MatchesList({ matches }: MatchesList) {
  console.log({ matches });

  return <Box>MatchesList</Box>;
}
