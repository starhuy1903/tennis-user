import { Box, Button } from '@mui/material';

import NoData from 'components/Common/NoData';

export default function MyGroup() {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <Box>
      <NoData />
      <Button onClick={handleClick}>Create group</Button>
    </Box>
  );
}
