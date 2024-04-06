import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import TabPanel from 'components/Common/TabPanel';
import { useGetGroupDetailsQuery } from 'store/api/group/groupApiSlice';
import { a11yProps } from 'utils/ui';

import Feeds from './Feeds';
import InfoSection from './InfoSection';
import Member from './Member';
import UpdateGroupInformation from './UpdateGroupInformation';

const GroupTabs = [
  {
    index: 0,
    label: 'Feeds',
    hash: 'feeds',
    component: <Feeds />,
  },
  {
    index: 1,
    label: 'Members',
    hash: 'members',
    component: <Member />,
  },
  {
    index: 2,
    label: 'Update Information',
    hash: 'information',
    component: <UpdateGroupInformation />,
  },
];

export default function GroupDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { data } = useGetGroupDetailsQuery(parseInt(id!));

  const [currentTab, setCurrentTab] = useState<number>(
    GroupTabs.find((e) => location.hash === `#${e.hash}`)?.index || GroupTabs[0].index
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    navigate(`#${GroupTabs.find((e) => e.index === newValue)!.hash}`, { replace: true });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <InfoSection data={data} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="Profile tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {GroupTabs.map((tab) => (
            <Tab
              key={tab.index}
              label={tab.label}
              {...a11yProps(tab.index)}
            />
          ))}
        </Tabs>
      </Box>
      {GroupTabs.map((tab) => (
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
