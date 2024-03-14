import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Tournaments() {
  const navigate = useNavigate();

  const handleCreateTournament = () => {
    navigate('tournaments/create');
  };

  return (
    <Stack gap={4}>
      <Button onClick={handleCreateTournament}>Create tournament</Button>
      <Box>
        <Typography variant="h4">Ongoing tournaments</Typography>
      </Box>
      <Box>
        <Typography variant="h4">Upcoming tournaments</Typography>
      </Box>

      <Box>
        <Typography variant="h4">Completed tournaments</Typography>
      </Box>
    </Stack>
  );
}
