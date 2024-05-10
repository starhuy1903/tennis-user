import { Box, Grid } from '@mui/material';

import NoData from 'components/Common/NoData';
import { UserPackage } from 'types/package';

import Pack from './Pack';

interface MyPackagesProps {
  packagesData: UserPackage[];
  onChooseMyPackage: (id: string) => void;
}

export default function MyPackages({ packagesData, onChooseMyPackage }: MyPackagesProps) {
  if (packagesData.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 500,
        }}
      >
        <NoData
          message={`You haven't owned a package that support creating tournament.`}
          gap={4}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid
        container
        spacing={2}
        mt={4}
      >
        {packagesData.map((item) => (
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
