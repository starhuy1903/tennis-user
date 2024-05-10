import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PlaceIcon from '@mui/icons-material/Place';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Button, Container, Divider, Paper, Stack, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { IconTitle } from 'components/Common/IconTitle';
import { LanguageOptions } from 'constants/app';
import { defaultGroupImage } from 'constants/group';
import { useLazyGetGroupDetailsQuery, useLeaveGroupMutation } from 'store/api/group/groupApiSlice';
import { setGroupDetails } from 'store/slice/groupSlice';
import { Group } from 'types/group';
import { showError } from 'utils/toast';

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
    label: 'Tournaments',
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
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathParts = location.pathname.split('/');

  const [getGroupDetails, { isLoading }] = useLazyGetGroupDetailsQuery();
  const [leaveGroup, { isLoading: leaveLoading }] = useLeaveGroupMutation();

  const [groupData, setGroupData] = useState<Group | null>(null);
  const [groupTabs, setGroupTabs] = useState(SharedTabs);

  const [currentTab, setCurrentTab] = useState(pathParts[pathParts.length - 1]);

  const { groupId } = useParams();

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(`/groups/${groupId}/${newValue}`);
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(parseInt(groupId!)).unwrap();

      showError('Leave group successfully.');
      navigate('/groups');
    } catch (error) {
      showError('Failed to leave group.');
    }
  };

  useEffect(() => {
    (async () => {
      if (groupId) {
        try {
          const res = await getGroupDetails(parseInt(groupId)).unwrap();
          setGroupData(res);
          if (res.isCreator) {
            setGroupTabs(GroupAdminTabs);
          }
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
  }, [getGroupDetails, navigate, dispatch, groupId]);

  if (isLoading || !groupData) {
    return <CenterLoading />;
  }

  return (
    <Container maxWidth="lg">
      <Paper sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, border: '1px white solid', mb: 4 }}>
        <img
          style={{ width: '100%', height: 300, objectFit: 'cover' }}
          src={groupData.image || defaultGroupImage}
          alt="group image"
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          pt={1}
          px={2}
        >
          <Stack>
            <Typography
              variant="h4"
              fontWeight={500}
            >
              {groupData.name}
            </Typography>

            <Stack color="gray">
              <Stack
                direction="row"
                gap={2}
              >
                <IconTitle
                  icon={<PeopleAltIcon />}
                  title={`${groupData.memberCount} ${groupData.memberCount > 1 ? 'members' : 'member'}`}
                />

                <IconTitle
                  icon={<LanguageIcon />}
                  title={LanguageOptions[groupData.language]}
                />
              </Stack>

              <IconTitle
                icon={<PlaceIcon />}
                title={groupData.activityZone}
              />
            </Stack>
          </Stack>

          <Box>
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLeaveGroup}
              disabled={leaveLoading}
            >
              Leave Group
            </Button>
          </Box>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Box px={4}>
          <TabContext value={currentTab}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              {groupTabs.map((tab) => {
                return (
                  <Tab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                  />
                );
              })}
            </TabList>
          </TabContext>
        </Box>
      </Paper>

      <Outlet />
    </Container>
  );
}
