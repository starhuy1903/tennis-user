import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

import Pack from './Pack';

const PacksSection = () => {
  const packages = [
    {
      id: '1',
      name: 'Essential pack',
      startTimestamp: 'Fri, 01 Mar 2024 17:42:41 GMT',
      endTimestamp: 'Sat, 01 Mar 2025 17:42:41 GMT',
    },
    {
      id: '2',
      name: 'Advance pack',
      startTimestamp: 'Fri, 01 Mar 2024 17:42:41 GMT',
      endTimestamp: 'Sat, 01 Mar 2025 17:42:41 GMT',
      groupName: 'The tennis group',
    },
  ];

  return (
    <Paper sx={{ padding: '20px' }}>
      {packages.length > 0 ? (
        <Grid
          container
          spacing={2}
        >
          {packages.map((e) => (
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
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Typography display="inline">
            You haven't buy any package yet. Check out our available packages <Link to="/pricing">here</Link>.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default PacksSection;
