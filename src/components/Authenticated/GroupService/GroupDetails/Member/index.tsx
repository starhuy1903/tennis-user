import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, CircularProgress, Fab, FormControl, TextField, Tooltip, Typography } from '@mui/material';
import { useDebounce } from 'hooks';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { useGetGroupDetailsQuery, useGetGroupMembersQuery } from 'store/api/group/groupApiSlice';
import { showModal } from 'store/slice/modalSlice';

import MemberItems from './MemberItems';

export default function Member() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [expand, setExpand] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 2000);

  const { groupId } = useParams();
  const { data, isLoading } = useGetGroupMembersQuery({ page: 1, take: 10, id: parseInt(groupId!) });
  const { data: groupDetail } = useGetGroupDetailsQuery(parseInt(groupId!));

  // const members = useMemo(() => {
  //   return data?.data.filter((e) => e.role !== 'group_admin') || [];
  // }, [data?.data]);

  const handleInvite = () => {
    dispatch(showModal(ModalKey.INVITE_INTO_GROUP));
  };

  const handleExpandChange = (_id: number) => (_: React.SyntheticEvent, newExpanded: boolean) => {
    setExpand(newExpanded ? _id : null);
  };

  const handleRemoveMember = (_id: number, name: string) => {
    confirm({ description: `This action will remove ${name} from this group.` })
      .then(() => {})
      .catch(() => {});
  };

  useEffect(() => {
    if (debouncedSearchValue.length >= 3) {
      const fetchSearchResult = async () => {
        //do fetching
      };

      fetchSearchResult();
    }
  }, [debouncedSearchValue]);

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
        {isLoading ? (
          <CircularProgress />
        ) : data && data?.data.length > 0 ? (
          data?.data.map((e) => (
            <MemberItems
              role={e.role}
              isCreator={groupDetail?.isCreator || false}
              key={e.user.id}
              data={e.user}
              expanded={expand === e.user.id}
              handleChange={handleExpandChange(e.user.id)}
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
