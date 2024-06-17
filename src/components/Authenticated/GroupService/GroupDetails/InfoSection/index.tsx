import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PlaceIcon from '@mui/icons-material/Place';
import { Button, Collapse, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import { IconTitle } from 'components/Common/IconTitle';
import { LanguageOptions } from 'constants/app';
import { defaultTournamentImage } from 'constants/tournament';
import { useLeaveGroupMutation } from 'store/api/group/groupApiSlice';
import { selectGroupBackground, showGroupBackground } from 'store/slice/groupSlice';
import { Group } from 'types/group';
import { showSuccess } from 'utils/toast';

interface InfoSectionProps {
  data: Group;
}

const InfoSection = ({ data }: InfoSectionProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const showBackground = useAppSelector(selectGroupBackground);

  const [leaveGroup, { isLoading: leaveLoading }] = useLeaveGroupMutation();

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(data.id).unwrap();

      showSuccess('Left group successfully.');
      navigate('/groups');
    } catch (error) {
      // handled error
    }
  };

  return (
    <>
      <Box position="relative">
        <Collapse in={showBackground}>
          <img
            style={{ width: '100%', height: 300, objectFit: 'cover' }}
            src={data.image || defaultTournamentImage}
            alt="tournament image"
          />
        </Collapse>
        {showBackground && (
          <IconButton
            aria-label="collapse"
            sx={{
              'position': 'absolute',
              'left': '50%',
              'bottom': 0,
              'transform': 'translateX(-50%) translateY(-50%)',
              'backgroundColor': 'rgba(0, 0, 0, 0.5)',
              'color': 'white',

              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
            onClick={() => dispatch(showGroupBackground(false))}
          >
            <KeyboardDoubleArrowUpIcon />
          </IconButton>
        )}
      </Box>

      <Collapse
        in={!showBackground}
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {!showBackground && (
          <IconButton
            aria-label="collapse"
            onClick={() => dispatch(showGroupBackground(true))}
            sx={{
              'mt': 2,
              'backgroundColor': 'rgba(0, 0, 0, 0.5)',
              'color': 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <KeyboardDoubleArrowDownIcon />
          </IconButton>
        )}
      </Collapse>

      <Stack
        direction="row"
        justifyContent="space-between"
        p={2}
      >
        <Stack>
          <Typography
            variant="h4"
            fontWeight={500}
          >
            {data.name}
          </Typography>

          <Stack color="gray">
            <Stack
              direction="row"
              gap={2}
            >
              <IconTitle
                icon={<PeopleAltIcon />}
                title={`${data.memberCount} ${data.memberCount > 1 ? 'members' : 'member'}`}
              />

              <IconTitle
                icon={<LanguageIcon />}
                title={LanguageOptions[data.language]}
              />
            </Stack>

            <IconTitle
              icon={<PlaceIcon />}
              title={data.activityZone}
            />
          </Stack>
        </Stack>

        {!data.isCreator && (
          <Box>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLeaveGroup}
              disabled={leaveLoading}
            >
              Leave Group
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default InfoSection;
