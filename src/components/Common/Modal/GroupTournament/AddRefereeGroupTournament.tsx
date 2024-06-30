import { Avatar, Box, Checkbox, FormLabel, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CenterLoading from 'components/Common/CenterLoading';
import {
  useAddRefereesGroupTournamentMutation,
  useLazyGetGroupTournamentNonParticipantsQuery,
} from 'store/api/group/group-tournaments/creator/participant';
import { showSuccess } from 'utils/toast';

import BaseModal from '../BaseModal';
import { AddRefereesProps } from '../types';

export default function AddRefereesGroupTournament({
  groupId,
  tournamentId,
  refetchRefereesData,
  onModalClose,
}: AddRefereesProps) {
  const [selectedReferees, setSelectedReferees] = useState<string[]>([]);

  const [getAvailableMembers, { isLoading, data: availableMembers }] = useLazyGetGroupTournamentNonParticipantsQuery();
  const [addReferees, { isLoading: isAddLoading }] = useAddRefereesGroupTournamentMutation();

  const handleCheckboxChange = (userId: string) => {
    setSelectedReferees((prevSelectedReferees) =>
      prevSelectedReferees.includes(userId)
        ? prevSelectedReferees.filter((id) => id !== userId)
        : [...prevSelectedReferees, userId]
    );
  };

  useEffect(() => {
    getAvailableMembers({ groupId, tournamentId });
  }, [getAvailableMembers, groupId, tournamentId]);

  const handleAddReferees = useCallback(
    async (userIds: string[]) => {
      try {
        await addReferees({ groupId, tournamentId, userIds }).unwrap();
        showSuccess('Added referees to the tournament successfully.');
        onModalClose();
        refetchRefereesData();
      } catch (error) {
        // handle error
      }
    },
    [addReferees, groupId, onModalClose, refetchRefereesData, tournamentId]
  );

  const renderBody = () => {
    if (isLoading) {
      return <CenterLoading height="400px" />;
    }

    if (!availableMembers || availableMembers.length === 0) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
          }}
        >
          <Typography>No available members to add as referees.</Typography>
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
        {availableMembers &&
          availableMembers.map((user) => (
            <FormLabel key={user.id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px',
                  border: `2px solid ${selectedReferees.includes(user.id) ? '#7F56D9' : '#E0E0E0'}`,
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
                  checked={selectedReferees.includes(user.id)}
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
      headerText="Add Referees"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Add"
      onClickPrimaryButton={() => handleAddReferees(selectedReferees)}
      disabledPrimaryButton={isLoading || isAddLoading || selectedReferees.length === 0}
    />
  );
}
