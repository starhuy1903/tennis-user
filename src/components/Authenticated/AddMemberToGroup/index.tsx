import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { useAddMemberMutation } from 'store/api/group/groupApiSlice';
import { showSuccess } from 'utils/toast';

export default function AddMemberToGroup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [requestAddMember, { isLoading }] = useAddMemberMutation();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
  }, [token, navigate]);

  const handleAddMember = async () => {
    try {
      const res = await requestAddMember(token!).unwrap();
      showSuccess('You have successfully joined the group');
      navigate(`/groups/${res.groupId}`);
    } catch (error) {
      navigate('/');
    }
  };

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            Invite to Group
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            You are about to join a group. Do you want to continue?
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAddMember}
          >
            Join Group
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
