import { Box } from '@mui/material';

import { Breadcrumbs } from 'components/Common/Breadcrumb';

import JoinedGroup from './JoinedGroup';
import MyGroup from './MyGroup';

export default function GroupService() {
  return (
    <Box>
      <Breadcrumbs />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingBottom: 8 }}>
        <JoinedGroup />
        <MyGroup />
      </Box>
    </Box>
  );
}
