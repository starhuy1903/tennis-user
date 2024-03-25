import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

import { useGetMyGroupsQuery } from 'store/api/group/groupApiSlice';
import { GroupStatus } from 'types/group';

import GroupCard from './GroupCard';

export default function MyGroup() {
  const { data: groupsData, isLoading } = useGetMyGroupsQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {groupsData?.data && groupsData.data.length > 0 ? (
        <Grid
          container
          spacing={3}
        >
          {groupsData?.data.map((e) => (
            <Grid
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={e.id}
            >
              <GroupCard
                id={e.id}
                name={e.name}
                status={e.status}
                createdAt={e.createdAt}
              />
            </Grid>
          ))}
          <Grid
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <GroupCard
              id={-1}
              image="https://picsum.photos/id/237/200/300"
              name="test with image"
              status={GroupStatus.ACTIVE}
              createdAt="2024-03-23T18:58:44.300Z"
            />
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>You haven't created any group yet.</Typography>
        </Box>
      )}
    </Box>
  );
}
