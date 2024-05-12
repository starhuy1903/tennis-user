import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PlaceIcon from '@mui/icons-material/Place';
import { Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { IconTitle } from 'components/Common/IconTitle';
import { LanguageOptions } from 'constants/app';
import { defaultGroupImage } from 'constants/group';
import { useLeaveGroupMutation } from 'store/api/group/groupApiSlice';
import { Group } from 'types/group';
import { showError } from 'utils/toast';

interface InfoSectionProps {
  data?: Group;
}

const InfoSection = ({ data }: InfoSectionProps) => {
  const navigate = useNavigate();

  const [leaveGroup, { isLoading: leaveLoading }] = useLeaveGroupMutation();

  const handleLeaveGroup = async () => {
    try {
      if (data) {
        await leaveGroup(data?.id).unwrap();

        showError('Leave group successfully.');
        navigate('/groups');
      }
    } catch (error) {
      showError('Failed to leave group.');
    }
  };

  return (
    <>
      {data ? (
        <>
          <img
            style={{ width: '100%', height: 300, objectFit: 'cover' }}
            src={data.image || defaultGroupImage}
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
                {data.name}
              </Typography>

              <Stack color="gray">
                <Stack
                  direction="row"
                  gap={2}
                >
                  <IconTitle
                    icon={<PeopleAltIcon />}
                    title={`${data.memberCount} ${data.memberCount > 1 ? 'members' : 'member'}`}
                  />

                  <IconTitle
                    icon={<LanguageIcon />}
                    title={LanguageOptions[data.language]}
                  />
                </Stack>

                <IconTitle
                  icon={<PlaceIcon />}
                  title={data.activityZone}
                />
              </Stack>
            </Stack>

            {!data.isCreator && (
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
            )}
          </Stack>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default InfoSection;
