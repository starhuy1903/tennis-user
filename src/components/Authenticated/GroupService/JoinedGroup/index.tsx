import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

import { useGetJoinedGroupsQuery } from 'store/api/group/groupApiSlice';

import GroupCard from '../components/GroupCard';

// !! Need paging
export default function JoinedGroup() {
  const navigate = useNavigate();
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
        <Tooltip
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
        </Tooltip>
      </Box>
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : groupsData?.data && groupsData.data.length > 0 ? (
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
