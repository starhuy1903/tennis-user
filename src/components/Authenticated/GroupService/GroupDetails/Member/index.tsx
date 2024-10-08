import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Fab, FormControl, TextField, Tooltip } from '@mui/material';
import { useDebounce } from 'hooks';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { ModalKey } from 'constants/modal';
import { useLazyGetGroupMembersQuery, useRemoveMemberMutation } from 'store/api/group/groupApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { showModal } from 'store/slice/modalSlice';
import { GetListResult } from 'types/base';
import { MemberDto } from 'types/user';
import { showSuccess } from 'utils/toast';

import MemberItems from './MemberItems';

export default function Member() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const [expand, setExpand] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const groupData = useAppSelector(selectGroup);

  const [memberData, setMemberData] = useState<GetListResult<MemberDto> | null>();
  const [getGroupMemberRequest, { isLoading }] = useLazyGetGroupMembersQuery();

  const [removeMember] = useRemoveMemberMutation();

  const filteredItems = useMemo(
    () => memberData?.data.filter((item) => item.user.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())),
    [memberData, debouncedSearchValue]
  );

  const handleGetMemberData = useCallback(async () => {
    try {
      const res = await getGroupMemberRequest({ page: 1, take: 100, id: groupData.id }).unwrap();
      setMemberData(res);
    } catch (error) {
      // handled error
    }
  }, [getGroupMemberRequest, groupData.id]);

  const handleInvite = () => {
    dispatch(
      showModal(ModalKey.INVITE_INTO_GROUP, {
        groupId: groupData.id,
      })
    );
  };

  const handleExpandChange = (_id: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
    setExpand(newExpanded ? _id : null);
  };

  const handleRemoveMember = (_id: string, name: string) => {
    confirm({ description: `This action will remove ${name} from this group.` }).then(async () => {
      try {
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
        showSuccess('Removed member successfully.');
      } catch (error) {
        // handled error
      }
    });
  };

  useEffect(() => {
    handleGetMemberData();
  }, [handleGetMemberData]);

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
        {groupData.isCreator && (
          <Tooltip title="Invite member">
            <Fab
              size="medium"
              color="primary"
              onClick={handleInvite}
            >
              <PersonAddIcon />
            </Fab>
          </Tooltip>
        )}
      </Box>
      <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
        {isLoading || !filteredItems ? (
          <CenterLoading height="10vh" />
        ) : filteredItems.length > 0 ? (
          filteredItems.map((e) => (
            <MemberItems
              role={e.role}
              isCreator={groupData.isCreator}
              key={e.user.id}
              data={e.user}
              expanded={expand === e.user.id}
              handleChange={handleExpandChange(e.user.id)}
              handleDelete={handleRemoveMember}
            />
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '30vh',
            }}
          >
            <NoData message="No member found." />
          </Box>
        )}
      </Box>
    </Box>
  );
}
