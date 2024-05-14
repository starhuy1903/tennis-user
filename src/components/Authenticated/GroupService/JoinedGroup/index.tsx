import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import CenterLoading from 'components/Common/CenterLoading';
import { useGetJoinedGroupsQuery } from 'store/api/group/groupApiSlice';

import GroupCard from '../Common/GroupCard';

// TODO: Need paging
export default function JoinedGroup() {
  const { data: groupsData, isLoading } = useGetJoinedGroupsQuery({ page: 1, take: 10 });

  return (
    <Paper sx={{ padding: '15px' }}>
      <Box sx={{ display: 'flex', marginBottom: '20px' }}>
        <Typography
          variant="h4"
          sx={{ flex: 1 }}
        >
          Joined Groups
        </Typography>
        {/* TODO: Need to implement search group feature */}
        {/* <Tooltip
          title="Find public group"
          placement="bottom"
        >
          <Fab
            color="primary"
            size="medium"
            onClick={() => navigate('/groups/search')}
          >
            <SearchIcon />
          </Fab>
        </Tooltip> */}
      </Box>
      <Box>
        {isLoading ? (
          <CenterLoading height="30vh" />
        ) : groupsData?.data && groupsData.data.length > 0 ? (
          <Grid
            container
            spacing={3}
          >
            {groupsData.data.map((e) => (
              <Grid
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={e.id}
              >
                <GroupCard data={e} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>You haven't joined any group yet.</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
