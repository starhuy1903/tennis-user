import { Box, Button } from '@mui/material';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

export default function Member() {
  const dispatch = useAppDispatch();

  const handleInvite = () => {
    dispatch(showModal(ModalKey.INVITE_INTO_GROUP));
  };

  return (
    <Box>
      Member
      <Button
        onClick={handleInvite}
        variant="contained"
      >
        Add member
      </Button>
    </Box>
  );
}
