import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Gender, ParticipantType, TournamentFormat, TournamentStatus } from 'types/tournament';

import TournamentList from './TournamentList';

const upcomingTournaments = [
  {
    id: 1,
    groupId: 1,
    name: '2022 PAC-12 Championships',
    slot: 50,
    participants: 20,
    gender: Gender.MALE,
    format: TournamentFormat.ROUND_ROBIN,
    participantType: ParticipantType.SINGLE,
    isPublic: false,
    image:
      'https://xs.pac-12.com/styles/crop_16_9_large_1x/s3/2022-04/Tennis%20Social%20Sizes_1920x1080-optimized.jpg?itok=WjlYagbf',
    description: 'This is a description of tournament 1',
    ageLimit: 18,
    registrationDueDate: '2024-03-15T23:59:59',
    startDate: '2024-03-20T23:59:59',
    endDate: '2024-03-25T23:59:59',
    status: TournamentStatus.UPCOMING,
    address: '123 Main St',
    contactName: 'John Doe',
    contactNumber: '123-456-7890',
    contactEmail: 'john@gmail.com',
    createdAt: '2024-03-10T23:59:59',
    updatedAt: '2024-03-10T23:59:59',
  },
];

const onGoingTournaments = [
  {
    id: 1,
    groupId: 1,
    name: '2022 PAC-12 Championships',
    slot: 50,
    participants: 20,
    gender: Gender.MALE,
    format: TournamentFormat.ROUND_ROBIN,
    participantType: ParticipantType.SINGLE,
    isPublic: false,
    image:
      'https://xs.pac-12.com/styles/crop_16_9_large_1x/s3/2022-04/Tennis%20Social%20Sizes_1920x1080-optimized.jpg?itok=WjlYagbf',
    description: 'This is a description of tournament 1',
    ageLimit: 18,
    registrationDueDate: '2024-03-15T23:59:59',
    startDate: '2024-03-20T23:59:59',
    endDate: '2024-03-25T23:59:59',
    status: TournamentStatus.ON_GOING,
    address: '123 Main St',
    contactName: 'John Doe',
    contactNumber: '123-456-7890',
    contactEmail: 'john@gmail.com',
    createdAt: '2024-03-10T23:59:59',
    updatedAt: '2024-03-10T23:59:59',
  },
];

const completedTournaments = [
  {
    id: 1,
    groupId: 1,
    name: '2022 PAC-12 Championships',
    slot: 50,
    participants: 20,
    gender: Gender.MALE,
    format: TournamentFormat.ROUND_ROBIN,
    participantType: ParticipantType.SINGLE,
    isPublic: false,
    image:
      'https://xs.pac-12.com/styles/crop_16_9_large_1x/s3/2022-04/Tennis%20Social%20Sizes_1920x1080-optimized.jpg?itok=WjlYagbf',
    description: 'This is a description of tournament 1',
    ageLimit: 18,
    registrationDueDate: '2023-03-15T23:59:59',
    startDate: '2023-03-20T23:59:59',
    endDate: '2023-03-25T23:59:59',
    status: TournamentStatus.COMPLETED,
    address: '123 Main St',
    contactName: 'John Doe',
    contactNumber: '123-456-7890',
    contactEmail: 'john@gmail.com',
    createdAt: '2023-03-10T23:59:59',
    updatedAt: '2023-03-10T23:59:59',
  },
];

export default function Tournaments() {
  const navigate = useNavigate();

  const handleCreateTournament = () => {
    navigate('tournaments/create');
  };

  return (
    <Stack gap={4}>
      <Button onClick={handleCreateTournament}>Create tournament</Button>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <EmojiEventsIcon />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Upcoming Tournaments
          </Typography>
        </Stack>

        <TournamentList tournaments={upcomingTournaments} />
      </Box>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <EmojiEventsIcon />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Ongoing Tournaments
          </Typography>
        </Stack>

        <TournamentList tournaments={onGoingTournaments} />
      </Box>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <WorkspacePremiumIcon />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Completed Tournaments
          </Typography>
        </Stack>

        <TournamentList tournaments={completedTournaments} />
      </Box>
    </Stack>
  );
}
