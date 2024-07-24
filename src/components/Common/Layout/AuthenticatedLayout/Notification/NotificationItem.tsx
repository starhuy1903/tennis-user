import { Box, ListItemText, MenuItem, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotificationType, TennisAppNotification } from 'types/notification';

type NotificationItemProps = {
  notification: TennisAppNotification;
  onCloseMenu: () => void;
};

export default function NotificationItem({ notification, onCloseMenu }: NotificationItemProps) {
  const navigate = useNavigate();

  const handleNavigateToTournament = useCallback(
    (tournamentId: number, tabName: string) => {
      navigate(`/tournaments/${tournamentId}/${tabName}`);
      onCloseMenu();
    },
    [navigate, onCloseMenu]
  );

  switch (notification.type) {
    case NotificationType.TOURNAMENT_PARTICIPANT: {
      return (
        <MenuItem onClick={() => handleNavigateToTournament(notification.data.tournamentId, 'participants')}>
          <Stack>
            <Typography>{notification.data.title}</Typography>
            <Typography>{notification.data.message}</Typography>
          </Stack>
        </MenuItem>
      );
    }

    case NotificationType.TOURNAMENT_SCHEDULE: {
      return (
        <MenuItem onClick={() => handleNavigateToTournament(notification.data.tournamentId, 'fixtures')}>
          <ListItemText>
            <Typography>Tournament schedule</Typography>
          </ListItemText>
        </MenuItem>
      );
    }

    case NotificationType.TOURNAMENT_MATCHES: {
      return (
        <MenuItem onClick={() => handleNavigateToTournament(notification.data.tournamentId, 'matches')}>
          <ListItemText>
            <Typography>Tournament matches</Typography>
          </ListItemText>
        </MenuItem>
      );
    }

    default:
      throw new Error('Invalid notification type');
  }
}
