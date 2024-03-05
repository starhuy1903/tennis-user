import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Fab, FormControl, TextField, Tooltip, Typography } from '@mui/material';
import { useDebounce } from 'hooks';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

import MemberItems, { MemberItemsData } from './MemberItems';

export default function Member() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const handleInvite = () => {
    dispatch(showModal(ModalKey.INVITE_INTO_GROUP));
  };

  const [expand, setExpand] = useState<string | null>(null);

  const handleExpandChange = (id: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpand(newExpanded ? id : null);
  };

  const members: Array<MemberItemsData> = [
    {
      id: '1',
      name: 'Member 1',
      avatar:
        'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.bing.com%2Fimages%2Fcreate%3Fform%3DFLPGEN%26qft%3D%2Bfilterui%253Aimagesize-large%2Bfilterui%253Acolor2-FGcls_WHITE%2Bfilterui%253Alicense-L2_L3_L4%2Bfilterui%253Aage-lt525600%26cw%3D1177%26ch%3D1024&psig=AOvVaw0WV-84nD0cr4WXcgrfJ2zP&ust=1709656553909000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLCos46F24QDFQAAAAAdAAAAABAR',
      joinAt: 'Fri, 01 Mar 2024 17:42:41 GMT',
    },
    {
      id: '2',
      name: 'Member 2',
      bio: 'This is a bio',
      joinAt: 'Sat, 02 Mar 2024 17:42:41 GMT',
    },
  ];

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 2000);

  useEffect(() => {
    if (debouncedSearchValue.length >= 3) {
      const fetchSearchResult = async () => {
        //do fetching
      };

      fetchSearchResult();
    }
  }, [debouncedSearchValue]);

  const handleRemoveMember = (id: string, name: string) => {
    confirm({ description: `This action will remove ${name} from this group.` })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px', height: '60px', marginBottom: '10px' }}>
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth>
            <TextField
              value={searchValue}
              placeholder="Type to search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
        </Box>
        <Tooltip title="Invite member">
          <Fab
            size="medium"
            color="primary"
            onClick={handleInvite}
          >
            <PersonAddIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
        {members.length > 0 ? (
          members.map((e) => (
            <MemberItems
              key={e.id}
              {...e}
              expanded={expand === e.id}
              handleChange={handleExpandChange(e.id)}
              handleDelete={handleRemoveMember}
            />
          ))
        ) : (
          <Typography textAlign="center">No member found.</Typography>
        )}
      </Box>
    </Box>
  );
}
