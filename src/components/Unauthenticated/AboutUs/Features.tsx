import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid, Stack, Tab, Typography } from '@mui/material';
import { useState } from 'react';

import BracketScreen from 'assets/images/brackets-screen.png';
import GroupScreen from 'assets/images/group-screen.png';
import NotificationScreen from 'assets/images/notification-screen.png';

function TabData({
  title,
  description,
  variant = 'h6',
}: {
  title: string;
  description: string;
  variant?: 'h6' | 'h4';
}) {
  return (
    <Box>
      <Typography
        variant={variant}
        fontWeight={500}
        color={variant === 'h4' ? 'primary' : 'textPrimary'}
        gutterBottom
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        fontWeight={400}
      >
        {description}
      </Typography>
    </Box>
  );
}

function TournamentFeature() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      spacing={4}
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <Stack
          direction="column"
          spacing={4}
        >
          <TabData
            title="Tournament Management"
            description="Easily manage tournaments with features like registration fee collection, participant management, and match scheduling."
            variant="h4"
          />

          <TabData
            title="Live Scores"
            description="Keep track of live scores from tennis matches in real-time. Get updates instantly to stay informed about the
            latest results."
          />

          <TabData
            title="Brackets Generation"
            description="Organize tournaments with various formats like Knockout, Round-Robin, and Group Playoff. Create brackets manually or automatically, with seeding."
          />

          <TabData
            title="Standings"
            description="Automatically updated player rankings based on match results, making it easy to track performance."
          />

          <TabData
            title="Referee Support"
            description="Referees can record match scores in real-time using mobile devices, ensuring quick and accurate updates."
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={BracketScreen}
          alt="Bracket screen"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Grid>
    </Grid>
  );
}

function GroupFeature() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <Stack
          direction="column"
          spacing={4}
        >
          <TabData
            title="Group Management"
            description="Easily create and manage tennis groups. Connect with players, organize events, and share updates within your group."
            variant="h4"
          />

          <TabData
            title="Fund Management"
            description="Managing expenses and fund contributions within the group, with a feature to remind members to contribute to the fund."
          />

          <TabData
            title="Organize Events"
            description="Easily plan group events, manage event details and schedules efficiently. "
          />

          <TabData
            title="Internal Tournaments"
            description="Simplify and manage tennis tournaments effortlessly, facilitating easier member connections."
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={GroupScreen}
          alt="Group screen"
          sx={{
            width: {
              xs: '500px',
              md: '300px',
            },
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Grid>
    </Grid>
  );
}

function OtherFeature() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <Stack
          direction="column"
          spacing={4}
        >
          <TabData
            title="Other Features"
            description="Our platform offers a wide range of features to make your tennis experience more enjoyable and convenient."
            variant="h4"
          />

          <TabData
            title="ELO Rating System"
            description="Track player performance and rankings using the ELO rating system. Our platform offers accurate and transparent player rankings, ensuring fair competition and rewarding player skill and performance."
          />

          <TabData
            title="Match Notifications"
            description="Receive notifications for each set of a match that you follow. Stay updated on the match progress
            and results."
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={NotificationScreen}
          alt="Notification screen"
          sx={{
            width: {
              xs: '500px',
              md: '300px',
            },
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Grid>
    </Grid>
  );
}

export default function Features() {
  const [currentTab, setCurrentTab] = useState('1');

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingY: '4rem',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
      >
        Highlight features
      </Typography>

      <Typography
        variant="body1"
        fontWeight={400}
        textAlign="center"
        my={2}
      >
        Our platform offers a wide range of features to make your tennis experience <br /> more enjoyable and
        convenient.
      </Typography>

      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChangeTab}
            variant="standard"
          >
            <Tab
              label="Tournament Management"
              value="1"
            />
            <Tab
              label="Group Management"
              value="2"
            />
            <Tab
              label="Other Features"
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TournamentFeature />
        </TabPanel>
        <TabPanel value="2">
          <GroupFeature />
        </TabPanel>
        <TabPanel value="3">
          <OtherFeature />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
