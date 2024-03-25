import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { displayTimestamp } from 'utils/datetime';

export interface MemberItemsData {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  joinAt: string;
}

interface MemberItemsProps extends MemberItemsData {
  expanded: boolean;
  handleChange: (event: SyntheticEvent, newExpanded: boolean) => void;
  handleDelete: (id: string, name: string) => void;
}

const MemberItems = ({ id, name, avatar, bio, joinAt, expanded, handleChange, handleDelete }: MemberItemsProps) => {
  const navigate = useNavigate();

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: '50px', height: '50px' }}
          />
          <Typography variant="h2">{name}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="column">
            <Typography>{bio ? bio : 'No bio.'}</Typography>
            <Typography fontSize="0.8rem">
              Join from {displayTimestamp(joinAt, { includeRelativeTimeToPresent: true })}
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', columnGap: '10px' }}>
            <Tooltip title="Visit profile page">
              <Fab
                size="small"
                color="success"
                onClick={() => navigate(`/people/${id}`)}
              >
                <AccountBoxIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Remove from group">
              <Fab
                size="small"
                color="error"
                onClick={() => handleDelete(id, name)}
              >
                <CloseIcon />
              </Fab>
            </Tooltip>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MemberItems;
