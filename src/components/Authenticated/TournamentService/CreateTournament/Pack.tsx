import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { UserPackage } from 'types/package';
import { displayTimestamp } from 'utils/datetime';

interface PackProps {
  packageData: UserPackage;
  onChooseMyPackage: (id: string) => void;
}

const Pack = ({ packageData, onChooseMyPackage }: PackProps) => {
  return (
    <Card
      sx={{
        width: 300,
      }}
    >
      <CardContent>
        <Stack>
          <Typography
            variant="h6"
            mb={1}
            color="primary"
          >
            {packageData.name}
          </Typography>

          <Typography
            display="inline"
            variant="body2"
            color="gray"
          >
            <b>Start date:</b> {displayTimestamp(packageData.startDate)}
          </Typography>

          <Typography
            display="inline"
            variant="body2"
            color="gray"
          >
            <b>End date:</b> {displayTimestamp(packageData.endDate)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
            }}
            onClick={() => onChooseMyPackage(packageData.id)}
          >
            Use
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Pack;
