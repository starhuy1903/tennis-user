import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import TabPanel from 'components/Common/TabPanel';
import { useLazyGetGroupDetailsQuery } from 'store/api/group/groupApiSlice';
import { resetGroupInfo, setGroupInfo } from 'store/slice/groupSlice';
import { a11yProps } from 'utils/ui';

import Feeds from './Feeds';
import Information from './Information';
import Member from './Member';

const GroupTabs = [
  {
    index: 0,
    label: 'Feeds',
    component: <Feeds />,
  },
  {
    index: 2,
    label: 'Members',
    component: <Member />,
  },
  {
    index: 3,
    label: 'Information',
    component: <Information />,
  },
];

export default function GroupDetail() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [getGroupDetails, { isLoading }] = useLazyGetGroupDetailsQuery();

  const [currentTab, setCurrentTab] = useState(Number(searchParams.get('tab')) || GroupTabs[0].index);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setSearchParams({ tab: String(newValue) });
  };

  useEffect(() => {
    // fetch group details data
    (async () => {
      try {
        if (groupId) {
          const res = await getGroupDetails(Number(groupId)).unwrap();
          dispatch(setGroupInfo(res));
        } else {
          dispatch(resetGroupInfo());
          navigate('/');
        }
      } catch (error) {
        dispatch(resetGroupInfo());
        navigate('/');
      }
    })();
  }, [groupId, getGroupDetails, navigate, dispatch]);

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box sx={{ width: '100%' }}>
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
