import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useGetMyGroupsQuery } from 'store/api/group/groupApiSlice';
import { GroupStatus } from 'types/group';

export default function MyGroup() {
  const navigate = useNavigate();
  const { data: groupsData, isLoading } = useGetMyGroupsQuery();

  const handleNewGroup = () => {
    navigate('/pricing');
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={3}
        >
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button onClick={handleNewGroup}>Create group</Button>
          </Card>
        </Grid>
        {groupsData?.map((group) => (
          <Grid
            xs={3}
            item
            key={group.id}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://t4.ftcdn.net/jpg/04/06/73/01/360_F_406730114_KzDtSXbWgrZjpAagr0QytgHLLyHrNUGX.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {group.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {group.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (group.adminId && group.status === GroupStatus.INACTIVE) {
                        navigate(`groups/${group.id}/create`);
                      } else {
                        navigate(`groups/${group.id}`);
                      }
                    }}
                    sx={{ mt: 4 }}
                    fullWidth
                  >
                    {group.adminId && group.status === GroupStatus.INACTIVE ? 'Continue create' : 'Go to group'}
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
