import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import LinkButton from 'components/Common/LinkButton';

import Avatar from './Avatar';

const ProfileSection = () => {
  const theme = useTheme();

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
            src={undefined}
            alt="Placeholder"
          />
          <Stack
            direction="column"
            flex={1}
            maxWidth={`calc(100% - 80px - 20px)`}
            marginLeft="20px"
          >
            <Typography fontSize="1.4rem">Name placeholder</Typography>
            <Typography>(Gender) - (Age) Yrs</Typography>
            <Typography noWrap>Area placeholder</Typography>
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
