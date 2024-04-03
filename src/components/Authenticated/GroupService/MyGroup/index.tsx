import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

import { useGetMyGroupsQuery } from 'store/api/group/groupApiSlice';

import GroupCard from '../components/GroupCard';

// !! Need paging
export default function MyGroup() {
  const navigate = useNavigate();
  const { data: groupsData, isLoading } = useGetMyGroupsQuery({ page: 1, take: 10 });

  return (
    <Paper sx={{ padding: '15px' }}>
      <Box sx={{ display: 'flex', marginBottom: '20px' }}>
        <Typography
          variant="h4"
          sx={{ flex: 1 }}
        >
          My Groups
        </Typography>
        <Tooltip
          title="Create new group"
          placement="bottom"
        >
          <Fab
            color="primary"
            size="medium"
            onClick={() => navigate('/groups/create')}
          >
            <AddIcon />
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
                <GroupCard data={e} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>You haven't created any group yet.</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
