import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FemaleIcon from '@mui/icons-material/Female';
import MailIcon from '@mui/icons-material/Mail';
import MaleIcon from '@mui/icons-material/Male';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import LinkButton from 'components/Common/LinkButton';
import { Gender } from 'constants/tournament';
import { formatDate } from 'utils/datetime';

import Avatar from './Avatar';

const ProfileSection = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.userInfo);

  if (!user) {
    return <CenterLoading />;
  }

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
          <Avatar
            src={user.image}
            alt="Avatar"
          />
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
                <MaleIcon
                  sx={{
                    color: '#008DDA',
                  }}
                />
              )}
              {user.gender === Gender.FEMALE && (
                <FemaleIcon
                  fontSize="large"
                  sx={{
                    color: '#FC819E',
                  }}
                />
              )}
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <MailIcon />
              <Typography>{user.email}</Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <CalendarMonthIcon />
              <Typography>{formatDate(user.dob)}</Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <PhoneIcon />
              <Typography>{user.phoneNumber}</Typography>
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
