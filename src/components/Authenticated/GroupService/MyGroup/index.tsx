import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useGetMyGroupsQuery } from 'store/api/group/groupApiSlice';

import GroupCard from '../Common/GroupCard';

// TODO: Need paging
export default function MyGroup() {
  const navigate = useNavigate();
  const { data: groupsData, isLoading } = useGetMyGroupsQuery(
    { page: 1, take: 10 },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <Paper sx={{ padding: 4, backgroundColor: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
          <CenterLoading />
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
            <NoData message={`You haven't created any group yet.`} />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
