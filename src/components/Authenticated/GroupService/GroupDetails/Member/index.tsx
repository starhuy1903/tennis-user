import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, CircularProgress, Fab, FormControl, TextField, Tooltip, Typography } from '@mui/material';
import { useDebounce } from 'hooks';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import { ModalKey } from 'constants/modal';
import { useLazyGetGroupMembersQuery, useRemoveMemberMutation } from 'store/api/group/groupApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { GetListResult } from 'types/base';
import { MemberDto } from 'types/user';
import { showError, showSuccess } from 'utils/toast';

import MemberItems from './MemberItems';

export default function Member() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [expand, setExpand] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 2000);
  const groupData = useAppSelector((state) => state.group.data);

  const [memberData, setMemberData] = useState<GetListResult<MemberDto> | null>();
  const [getGroupMemberRequest, { isLoading }] = useLazyGetGroupMembersQuery();

  // const members = useMemo(() => {
  //   return data?.data.filter((e) => e.role !== 'group_admin') || [];
  // }, [data?.data]);

  const handleInvite = () => {
    dispatch(showModal(ModalKey.INVITE_INTO_GROUP));
  };

  const handleExpandChange = (_id: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
    setExpand(newExpanded ? _id : null);
  };

  const [removeMember] = useRemoveMemberMutation();
  const handleRemoveMember = (_id: string, name: string) => {
    confirm({ description: `This action will remove ${name} from this group.` })
      .then(async () => {
        try {
          if (groupData) {
            await removeMember({ groupId: groupData.id, userId: _id });

            setMemberData((prev) => {
              if (prev) {
                return {
                  ...prev,
                  data: prev.data.filter((e) => e.user.id !== _id),
                };
              }
              return prev;
            });
            showSuccess('Remove member successfully.');
          }
        } catch (error) {
          showError('Remove member failed.');
        }
      })
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

  useEffect(() => {
    (async () => {
      if (groupData?.id) {
        try {
          const res = await getGroupMemberRequest({ page: 1, take: 10, id: groupData.id }).unwrap();
          setMemberData(res);
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getGroupMemberRequest, groupData?.id]);

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
        ) : memberData && memberData.data.length > 0 ? (
          memberData.data.map((e) => (
            <MemberItems
              role={e.role}
              isCreator={!!groupData?.isCreator}
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
