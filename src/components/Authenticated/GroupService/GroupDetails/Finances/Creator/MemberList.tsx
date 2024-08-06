import { Avatar, Box, Checkbox, FormLabel, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';

import { MemberDto } from 'types/user';

type MemberListProps = {
  memberData: MemberDto[];
  selectedMembers: string[];
  onSelectedMembersChange: (selectedMembers: string[]) => void;
  selectedAll: boolean;
};

export default function MemberList({
  selectedMembers,
  memberData,
  onSelectedMembersChange,
  selectedAll,
}: MemberListProps) {
  const handleCheckboxChange = useCallback(
    (userId: string) => {
      if (selectedMembers.includes(userId)) {
        onSelectedMembersChange(selectedMembers.filter((id) => id !== userId));
      } else {
        onSelectedMembersChange([...selectedMembers, userId]);
      }
    },
    [onSelectedMembersChange, selectedMembers]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      {memberData.length > 0 &&
        memberData.map((member) => (
          <FormLabel key={member.userId}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                border: `2px solid ${selectedMembers.includes(member.userId) ? '#7F56D9' : '#E0E0E0'}`,
                borderRadius: '6px',
                transition: 'border-color 0.2s ease',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                <Avatar
                  src={member.user.image}
                  alt={member.user.name}
                  sx={{ width: '30px', height: '30px' }}
                />
                <Stack color="black">
                  <Typography
                    variant="subtitle1"
                    fontSize={14}
                  >
                    {member.user.name}
                  </Typography>
                </Stack>
              </Box>

              <Checkbox
                checked={selectedMembers.includes(member.userId) || selectedAll}
                onChange={() => handleCheckboxChange(member.userId)}
                disabled={selectedAll}
              />
            </Box>
          </FormLabel>
        ))}
    </Box>
  );
}
