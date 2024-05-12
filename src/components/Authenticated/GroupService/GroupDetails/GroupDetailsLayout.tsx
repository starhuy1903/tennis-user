import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Tab } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetGroupDetailsQuery } from 'store/api/group/groupApiSlice';
import { setGroupDetails } from 'store/slice/groupSlice';
import { Group } from 'types/group';
import { showError } from 'utils/toast';

import InfoSection from './InfoSection';

const SharedTabs = [
  {
    label: 'Feeds',
    value: 'feeds',
  },
  {
    label: 'Members',
    value: 'members',
  },
  {
    label: 'Group Tournaments',
    value: 'tournaments',
  },
];

const GroupAdminTabs = [
  ...SharedTabs,
  {
    label: 'Update Information',
    value: 'information',
  },
];

export default function GroupDetailsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const dispatch = useAppDispatch();

  const { groupId } = useParams();

  const [getGroupDetails, { isLoading }] = useLazyGetGroupDetailsQuery();

  const [groupData, setGroupData] = useState<Group | null>(null);

  const GroupTabs = groupData?.isCreator ? GroupAdminTabs : SharedTabs;

  const initializedTab = useMemo(
    () => (GroupTabs.find((tab) => tab.value === pathParts[3]) ? pathParts[3] : GroupTabs[0].value),
    [GroupTabs, pathParts]
  );

  const [currentTab, setCurrentTab] = useState('');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(`/groups/${groupId}/${newValue}`);
  };

  useEffect(() => {
    (async () => {
      if (groupId) {
        try {
          const res = await getGroupDetails(parseInt(groupId)).unwrap();
          setGroupData(res);
          dispatch(setGroupDetails(res));
        } catch (error) {
          showError('Group not found.');
          navigate('/groups');
        }
      } else {
        showError('Group not found.');
        navigate('/groups');
      }
    })();
  }, [dispatch, getGroupDetails, groupId, navigate]);

  if (isLoading || !groupData) {
    return <CenterLoading />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <InfoSection data={groupData} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabContext value={currentTab || initializedTab}>
          <Box sx={{ mt: 2 }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              {GroupTabs.map((tab) => {
                return (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                );
              })}
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Outlet />
    </Box>
  );
}
