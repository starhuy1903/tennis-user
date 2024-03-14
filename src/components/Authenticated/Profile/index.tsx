// import Box from '@mui/material/Box';
// import PacksSection from './components/PacksSection';
// import ProfileSection from './components/ProfileSection';
// const Profile = () => {
//   return (
//     <>
//       <ProfileSection />
//       <Box sx={{ marginTop: '15px' }}>
//         <PacksSection />
//       </Box>
//     </>
//   );
// };
// export default Profile;
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TabPanel from 'components/Common/TabPanel';
import { a11yProps } from 'utils/ui';

import AccountSettings from './components/AccountSettings';
import PacksSection from './components/PacksSection';
import ProfileSection from './components/ProfileSection';

type ProfileTabName = 'feeds' | 'packages' | 'payments' | 'settings';

const ProfileTabs: Array<{
  index: number;
  label: string;
  component: ReactNode;
  tabName: ProfileTabName;
}> = [
  {
    index: 0,
    label: 'Feeds',
    component: <Typography>Feeds</Typography>,
    tabName: 'feeds',
  },
  {
    index: 1,
    label: 'Packages',
    component: <PacksSection />,
    tabName: 'packages',
  },
  {
    index: 2,
    label: 'Payments',
    component: <Typography>Payments</Typography>,
    tabName: 'payments',
  },
  {
    index: 3,
    label: 'Account Settings',
    component: <AccountSettings />,
    tabName: 'settings',
  },
];

interface ProfileProps {
  activeTab?: ProfileTabName;
}

export default function Profile({ activeTab = 'feeds' }: ProfileProps) {
  const [currentTab, setCurrentTab] = useState(
    ProfileTabs.find((e) => e.tabName === activeTab)?.index || ProfileTabs[0].index
  );

  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(`/profile/${ProfileTabs.find((e) => e.index === newValue)?.tabName || ProfileTabs[0].tabName}`);
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ProfileSection />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="Profile tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {ProfileTabs.map((tab) => (
            <Tab
              label={tab.label}
              {...a11yProps(tab.index)}
            />
          ))}
        </Tabs>
      </Box>
      {ProfileTabs.map((tab) => (
        <TabPanel
          value={currentTab}
          index={tab.index}
        >
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}
