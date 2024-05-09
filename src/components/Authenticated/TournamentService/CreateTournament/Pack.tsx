import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import { Button, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { UserPackage } from 'types/package';
import { displayTimestamp } from 'utils/datetime';

interface PackProps {
  packageData: UserPackage;
  onChooseMyPackage: (id: string) => void;
}

const Pack = ({ packageData, onChooseMyPackage }: PackProps) => {
  // const usedService = useMemo(() => getUsedTournamentService(packageData), [packageData]);

  return (
    <Card>
      <CardHeader
        title={packageData.name}
        titleTypographyProps={{ variant: 'h2', fontWeight: 'bold' }}
      />
      <CardContent>
        <Stack>
          <Box></Box>
          <Box>
            <Typography
              display="inline"
              fontWeight="bold"
              marginRight="10px"
            >
              End Date
            </Typography>
            <Typography display="inline">{displayTimestamp(packageData.endDate)}</Typography>
          </Box>
          <Stack
            gap={1}
            mt={1}
          >
            {packageData.services.map((service) => (
              <Stack
                direction="row"
                alignItems="center"
                gap={2}
              >
                <ElectricalServicesOutlinedIcon />
                <Typography
                  display="inline"
                  marginRight="10px"
                >
                  {service.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onChooseMyPackage(packageData.id)}
        >
          Use to create tournament
        </Button>
      </CardActions>
    </Card>
  );
};

export default Pack;
