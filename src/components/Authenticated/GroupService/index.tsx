import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import MyGroup from './MyGroup';

export default function GroupService() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: 'flex', marginBottom: '20px' }}>
        <Typography
          variant="h4"
          sx={{ flex: 1 }}
        >
          My Group
        </Typography>
        <Tooltip
          title="Create new group"
          placement="bottom-end"
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
      <MyGroup />
    </Box>
  );
}
