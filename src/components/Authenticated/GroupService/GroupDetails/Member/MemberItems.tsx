// import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip } from '@mui/material';
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
// import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import { MemberRole } from 'constants/group';
import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';
import { MemberUser } from 'types/user';

interface MemberItemsProps {
  role: MemberRole;
  isCreator: boolean;
  data: MemberUser;
  expanded: boolean;
  handleChange: (event: SyntheticEvent, newExpanded: boolean) => void;
  handleDelete: (id: string, name: string) => void;
}

const MemberItems = ({ role, isCreator, data, expanded, handleChange, handleDelete }: MemberItemsProps) => {
  const userId = useAppSelector((state) => state.user.userInfo?.id);
  const dispatch = useAppDispatch();

  const handleShowUserProfile = () => {
    dispatch(
      showModal(ModalKey.SHOW_USER_PROFILE, {
        userId: data.id,
      })
    );
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
          <Avatar
            src={data.image}
            alt={data.name}
            sx={{ width: '50px', height: '50px' }}
          />
          <Typography variant="h2">{data.name}</Typography>

          {userId === data.id && (
            <Chip
              label="You"
              size="small"
              variant="filled"
              sx={{
                backgroundColor: '#91C788',
                color: 'white',
              }}
            />
          )}

          {role === MemberRole.GROUP_ADMIN && (
            <Chip
              label="Admin"
              size="small"
              variant="filled"
              sx={{
                backgroundColor: '#FF2E63',
                color: 'white',
              }}
            />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="column">
            <Typography>{data.bio ? data.bio : 'No bio.'}</Typography>
            {/* <Typography fontSize="0.8rem">
              Join from {displayTimestamp(joinAt, { includeRelativeTimeToPresent: true })}
            </Typography> */}
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', columnGap: '10px' }}>
            <Tooltip title="Show profile">
              <Fab
                size="small"
                color="success"
                onClick={handleShowUserProfile}
              >
                <AccountBoxIcon />
              </Fab>
            </Tooltip>
            {isCreator && role !== MemberRole.GROUP_ADMIN && userId !== data.id && (
              <Tooltip title="Remove from group">
                <Fab
                  size="small"
                  color="error"
                  onClick={() => handleDelete(data.id, data.name)}
                >
                  <CloseIcon />
                </Fab>
              </Tooltip>
            )}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MemberItems;
