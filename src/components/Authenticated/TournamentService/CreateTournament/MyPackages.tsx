import { Box, Grid } from '@mui/material';

import { UserPackage } from 'types/package';

import Pack from './Pack';

interface MyPackagesProps {
  packageData: UserPackage[];
  onChooseMyPackage: (id: string) => void;
}

export default function MyPackages({ packageData, onChooseMyPackage }: MyPackagesProps) {
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid
        container
        spacing={2}
        mt={4}
      >
        {packageData.map((item) => (
          <Grid
            xs={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Pack
              packageData={item}
              onChooseMyPackage={onChooseMyPackage}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
