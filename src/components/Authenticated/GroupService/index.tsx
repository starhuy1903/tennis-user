import Container from '@mui/material/Container';

import { Breadcrumbs } from 'components/Common/Breadcrumb';

import JoinedGroup from './JoinedGroup';
import MyGroup from './MyGroup';

export default function GroupService() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px', paddingBottom: '20px' }}>
      <Breadcrumbs />
      <MyGroup />
      <JoinedGroup />
    </Container>
  );
}
