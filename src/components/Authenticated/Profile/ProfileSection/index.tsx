import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FemaleIcon from '@mui/icons-material/Female';
import MailIcon from '@mui/icons-material/Mail';
import MaleIcon from '@mui/icons-material/Male';
import PhoneIcon from '@mui/icons-material/Phone';
import { Chip, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from 'store';

import LinkButton from 'components/Common/LinkButton';
import { FormatDateTime } from 'constants/datetime';
import { Gender } from 'constants/tournament';
import { displayDateTime } from 'utils/datetime';

import Avatar from './Avatar';

const ProfileSection = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.userInfo);

  if (!user) return null;

  return (
    <Paper sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: '10px', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            overflow: 'hidden',

            [theme.breakpoints.up('md')]: {
              width: '50%',
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Avatar
              src={user.image}
              alt="user-profile"
            />

            <Chip
              label={`${user.elo || 'No'} ELO`}
              size="small"
              variant={user.elo ? 'filled' : 'outlined'}
              color="primary"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: user.elo ? theme.palette.primary.main : 'white',
              }}
            />
          </Box>
          <Stack
            direction="column"
            flex={1}
            maxWidth={`calc(100% - 80px - 20px)`}
            marginLeft="20px"
            color="gray"
            spacing={0.5}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Typography
                variant="h5"
                color="black"
              >
                {user.name}
              </Typography>

              {user.gender === Gender.MALE && (
                <Tooltip title="Gender: Male">
                  <MaleIcon
                    fontSize="medium"
                    sx={{
                      color: '#008DDA',
                    }}
                  />
                </Tooltip>
              )}
              {user.gender === Gender.FEMALE && (
                <Tooltip title="Gender: Female">
                  <FemaleIcon
                    fontSize="medium"
                    sx={{
                      color: '#FC819E',
                    }}
                  />
                </Tooltip>
              )}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Tooltip title="Email">
                <MailIcon />
              </Tooltip>
              <Typography>{user.email ? user.email : '--'}</Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Tooltip title="Date of birth">
                <CalendarMonthIcon />
              </Tooltip>
              <Typography>
                {user.dob ? displayDateTime({ dateTime: user.dob, targetFormat: FormatDateTime.DATE_1 }) : '--'}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Tooltip title="Phone number">
                <PhoneIcon />
              </Tooltip>
              <Typography>{user.phoneNumber ? user.phoneNumber : '--'}</Typography>
            </Stack>
          </Stack>
        </Box>
        <Box>
          <LinkButton
            to="/profile/edit"
            buttonProps={{ variant: 'contained' }}
          >
            Edit profile
          </LinkButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileSection;
