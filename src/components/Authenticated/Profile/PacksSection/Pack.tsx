import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';
import { UserPackage } from 'types/package';
import { displayTimestamp } from 'utils/datetime';

const Pack = ({ pack }: { pack: UserPackage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigate = (serviceName: string) => {
    navigate(`/${serviceName}/create`);
  };

  return (
    <Card>
      <CardContent>
        <Stack>
          <Typography
            variant="h6"
            mb={1}
            color="primary"
          >
            {pack.name}
          </Typography>

          <Typography
            display="inline"
            variant="body2"
            color="gray"
          >
            <b>Start date:</b> {displayTimestamp(pack.startDate)}
          </Typography>

          <Typography
            display="inline"
            variant="body2"
            color="gray"
          >
            <b>End date:</b> {displayTimestamp(pack.endDate)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
            }}
            onClick={() => {
              dispatch(
                showModal(ModalKey.SHOW_PACKAGE_DETAIL, {
                  package: pack,
                  onNavigate: handleNavigate,
                })
              );
            }}
          >
            View
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Pack;
