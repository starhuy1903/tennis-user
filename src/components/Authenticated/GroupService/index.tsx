import Container from '@mui/material/Container';

import JoinedGroup from './JoinedGroup';
import MyGroup from './MyGroup';

export default function GroupService() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px', paddingBottom: '20px' }}>
      <MyGroup />
      <JoinedGroup />
    </Container>
  );
}
