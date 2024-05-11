import { Avatar, Box, Checkbox, FormLabel, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import {
  useAddParticipantsMutation,
  useGetGroupTournamentNonParticipantsQuery,
} from 'store/api/group/groupTournamentApiSlice';
import { showSuccess } from 'utils/toast';

import CenterLoading from '../CenterLoading';
import BaseModal from './BaseModal';
import { AddParticipantsProps } from './types';

export default function AddParticipants({ groupId, tournamentId, onModalClose }: AddParticipantsProps) {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const { data, isLoading } = useGetGroupTournamentNonParticipantsQuery(
    {
      groupId,
      tournamentId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [addParticipants, { isLoading: isAddLoading }] = useAddParticipantsMutation();

  const handleCheckboxChange = (userId: string) => {
    setSelectedParticipants((prevSelectedParticipants) =>
      prevSelectedParticipants.includes(userId)
        ? prevSelectedParticipants.filter((id) => id !== userId)
        : [...prevSelectedParticipants, userId]
    );
  };

  const handleAddParticipants = async (userIds: string[]) => {
    try {
      await addParticipants({ groupId, tournamentId, userIds }).unwrap();
      showSuccess('Added participants to the tournament successfully.');
      onModalClose();
    } catch (error) {
      // handle error
    }
  };

  const renderBody = () => {
    if (isLoading) {
      return <CenterLoading />;
    }

    if (!data || data.length === 0) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
          }}
        >
          <Typography>No more members to add to the tournament.</Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxHeight: '400px',
        }}
      >
        {data &&
          data.map((user) => (
            <FormLabel key={user.id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px',
                  border: `2px solid ${selectedParticipants.includes(user.id) ? '#7F56D9' : '#E0E0E0'}`,
                  borderRadius: '6px',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                  <Avatar
                    src={user?.image}
                    alt={user.name}
                    sx={{ width: '80px', height: '80px' }}
                  />
                  <Stack color="black">
                    <Typography variant="subtitle1">{user.name}</Typography>
                    <Typography variant="body2">{user.email}</Typography>
                  </Stack>
                </Box>

                <Checkbox
                  checked={selectedParticipants.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </Box>
            </FormLabel>
          ))}
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="Add Participants"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Add"
      onClickPrimaryButton={() => handleAddParticipants(selectedParticipants)}
      disabledPrimaryButton={isLoading || isAddLoading || selectedParticipants.length === 0}
    />
  );
}
