import { Box, Grid } from '@mui/material';

import { ServiceType } from 'types/package';

import Pack from './Pack';

interface MyPackagesProps {
  packageData: any[];
  onChooseMyPackage: (id: number) => void;
  type?: ServiceType;
}

export default function MyPackages({ packageData, onChooseMyPackage, type }: MyPackagesProps) {
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
