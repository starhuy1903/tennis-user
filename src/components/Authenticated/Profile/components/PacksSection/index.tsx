import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import Pack from './Pack';

const PacksSection = () => {
  return (
    <Paper sx={{ padding: '20px' }}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          xs={12}
          md={6}
          lg={4}
          xl={3}
        >
          <Pack
            id="12445"
            name="Essential pack"
            startTimestamp="Fri, 01 Mar 2024 17:42:41 GMT"
            endTimestamp="Sat, 01 Mar 2025 17:42:41 GMT"
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          lg={4}
          xl={2}
        >
          <Pack
            id="12446"
            name="Advance pack"
            startTimestamp="Fri, 01 Mar 2024 17:42:41 GMT"
            endTimestamp="Sat, 01 Mar 2025 17:42:41 GMT"
            groupName="The tennis group"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PacksSection;
