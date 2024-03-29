import { Box, Grid, Typography } from '@mui/material';

import Pack from './Pack';

interface MyTournamentPackagesProps {
  packageData: any[];
  onChooseMyPackage: (id: string) => void;
}

export default function MyTournamentPackages({ packageData, onChooseMyPackage }: MyTournamentPackagesProps) {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5">My Packages</Typography>
      <Grid
        container
        spacing={2}
        mt={4}
      >
        {packageData.map((e) => (
          <Grid
            xs={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Pack
              id={e.id}
              name={e.name}
              startTimestamp={e.startTimestamp}
              endTimestamp={e.endTimestamp}
              groupName={e.groupName}
              onChooseMyPackage={onChooseMyPackage}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
