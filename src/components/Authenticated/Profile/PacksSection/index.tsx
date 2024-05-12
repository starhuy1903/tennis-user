import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useGetMyPackagesQuery } from 'store/api/packageApiSlice';

import Pack from './Pack';

const PacksSection = () => {
  const { data: myPackagesData, isLoading } = useGetMyPackagesQuery();

  if (isLoading) {
    return <CenterLoading />;
  }

  if (!myPackagesData || myPackagesData.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          height: 500,
        }}
      >
        <NoData message="You haven't owned a package yet." />

        <Button
          component={Link}
          to="/pricing"
          size="large"
          color="primary"
          variant="contained"
          sx={{
            width: 200,
          }}
        >
          Buy package
        </Button>
      </Box>
    );
  }

  return (
    <Paper sx={{ padding: '20px' }}>
      <Grid
        container
        spacing={2}
      >
        {myPackagesData.map((e) => (
          <Grid
            key={e.id}
            xs={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Pack pack={e} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PacksSection;
