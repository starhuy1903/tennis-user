import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Stack, Tab } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetGroupDetailsQuery } from 'store/api/group/groupApiSlice';
import { selectGroup } from 'store/slice/groupSlice';

import AllTournaments from './AllTournaments';
import ManageTournaments from './ManageTournaments';
import MyTournaments from './MyTournaments';

export default function GroupTournaments() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const groupData = useAppSelector(selectGroup);
  const [currentTab, setCurrentTab] = useState('1');

  const [getGroupDetails, { isLoading }] = useLazyGetGroupDetailsQuery();

  useEffect(() => {
    (async () => {
      if (!groupId) {
        navigate('/groups');
        return;
      }

      if (groupData.id === 0) {
        try {
          await getGroupDetails(parseInt(groupId));
          return;
        } catch (error) {
          navigate('/groups');
          return;
        }
      }
    })();
  }, [getGroupDetails, groupData.id, groupId, navigate]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const customRoutes = useMemo(
    () => [
      {
        path: '/groups/:groupId',
        breadcrumb: groupData.name,
      },
    ],
    [groupData.name]
  );

  if (isLoading || groupData.id === 0) {
    return <CenterLoading />;
  }

  return (
    <Stack>
      <Breadcrumbs customRoutes={customRoutes} />

      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChangeTab}
            aria-label="Tournament tabs"
            variant="fullWidth"
          >
            <Tab
              label="All Tournaments"
              value="1"
            />
            {!groupData.isCreator && (
              <Tab
                label="My Tournaments"
                value="2"
              />
            )}
            {groupData.isCreator && (
              <Tab
                label="Manage Tournaments"
                value="3"
              />
            )}
          </TabList>
        </Box>
        <TabPanel value="1">
          <AllTournaments />
        </TabPanel>
        {!groupData.isCreator && (
          <TabPanel value="2">
            <MyTournaments />
          </TabPanel>
        )}
        {groupData.isCreator && (
          <TabPanel value="3">
            <ManageTournaments />
          </TabPanel>
        )}
      </TabContext>
    </Stack>
  );
}
