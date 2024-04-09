import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { LANGUAGES } from 'constants/app';
import { Group } from 'types/group';

import Avatar from './Avatar';

interface InfoSectionProps {
  data?: Group;
}

const InfoSection = ({ data }: InfoSectionProps) => {
  const theme = useTheme();

  return (
    <Paper sx={{ padding: '20px' }}>
      {data ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: '10px', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              overflow: 'hidden',

              [theme.breakpoints.up('md')]: {
                width: '100%',
              },
            }}
          >
            <Avatar
              src={data.image}
              alt={data.name}
            />
            <Stack
              direction="column"
              flex={1}
              maxWidth={`calc(100% - 80px - 20px)`}
              marginLeft="20px"
            >
              <Typography fontSize="1.4rem">{data.name}</Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                <PeopleIcon /> {data.memberCount} members
              </Typography>
              <Box sx={{ display: 'flex', columnGap: '20px' }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                  <LocationOnIcon />
                  {data.activityZone}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                  <LanguageIcon />
                  {LANGUAGES.find((e) => e.value === data.language)?.label || 'Unknown'}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export default InfoSection;
