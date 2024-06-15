import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import TabPanel from 'components/Common/TabPanel';
import { a11yProps } from 'utils/ui';

import AccountSettings from './AccountSettings';
import FeedSection from './FeedSection';
import PacksSection from './PacksSection';
import PaymentSection from './PaymentSection';
import ProfileSection from './ProfileSection';
import RefereeSection from './RefereeSection';

type ProfileTabName = 'feeds' | 'packages' | 'payments' | 'settings' | 'referee';

const ProfileTabs: Array<{
  index: number;
  label: string;
  component: ReactNode;
  tabName: ProfileTabName;
}> = [
  {
    index: 0,
    label: 'Feeds',
    component: <FeedSection />,
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
    component: <PaymentSection />,
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
  const navigate = useNavigate();
  const isReferee = useAppSelector((state) => state.user.userInfo?.isReferee);

  const profileTabs = useMemo(() => {
    if (!isReferee) {
      return [
        ...ProfileTabs,
        {
          index: 4,
          label: 'Referee',
          component: <RefereeSection />,
          tabName: 'referee',
        },
      ];
    }
    return ProfileTabs;
  }, [isReferee]);

  const [currentTab, setCurrentTab] = useState(
    profileTabs.find((e) => e.tabName === activeTab)?.index || profileTabs[0].index
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(`/profile/${profileTabs.find((e) => e.index === newValue)?.tabName || profileTabs[0].tabName}`);
    setCurrentTab(newValue);
  };

  const customRoutes = [
    {
      path: '/profile',
      breadcrumb: null,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Breadcrumbs customRoutes={customRoutes} />
      <ProfileSection />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="Profile tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {profileTabs.map((tab) => (
            <Tab
              key={tab.index}
              label={tab.label}
              {...a11yProps(tab.index)}
            />
          ))}
        </Tabs>
      </Box>
      {profileTabs.map((tab) => (
        <TabPanel
          key={tab.index}
          value={currentTab}
          index={tab.index}
        >
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}
