import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BoughtPackage } from 'types/purchasedPackage';
import { displayTimestamp } from 'utils/datetime';

interface PackageProps {
  data: BoughtPackage;
  selected: boolean;
  handleSelect: () => void;
}

// !! Need to update package UI
const Package = ({ data, selected, handleSelect }: PackageProps) => {
  return (
    <Card
      sx={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: (theme) => (selected ? theme.palette.primary.main : 'transparent'),
      }}
      onClick={() => {
        if (!selected) handleSelect();
      }}
    >
      <CardHeader
        title={data.name + ' Package'}
        sx={{ backgroundColor: (theme) => (selected ? theme.palette.primary.main : 'unset') }}
        titleTypographyProps={{
          variant: 'h2',
          sx: {
            color: (theme) => (selected ? theme.palette.common.white : 'unset'),
            fontWeight: 'bold',
          },
        }}
      />
      <CardContent>
        <Stack>
          <Box>
            <Typography
              fontSize="1rem"
              display="inline-flex"
              sx={{ alignItems: 'center' }}
            >
              <AccessTimeIcon sx={{ fontSize: 'inherit', marginRight: '5px' }} />
              <Typography
                fontSize="inherit"
                fontWeight="bold"
                marginRight="10px"
                component="b"
              >
                Expire at:
              </Typography>
              {displayTimestamp(data.endDate, { includeRelativeTimeToPresent: true })}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Package;
