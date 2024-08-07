import { MenuItem, Stack, Typography } from '@mui/material';
import { deepPurple, grey } from '@mui/material/colors';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormatDateTime } from 'constants/datetime';
import { NotificationType, TennisAppNotification } from 'types/notification';
import { displayDateTime } from 'utils/datetime';

type NotificationStyledProps = {
  title: string;
  message: string;
  onClick: () => void;
  isRead: boolean;
  timestamp: string;
};

function NotificationStyled({ title, message, onClick, isRead, timestamp }: NotificationStyledProps) {
  return (
    <MenuItem
      onClick={onClick}
      sx={{
        'borderBottom': '1px solid',
        'borderColor': 'divider',
        'bgcolor': isRead ? grey[200] : 'transparent',

        '&:hover': {
          bgcolor: deepPurple[50],
        },
      }}
    >
      <Stack
        maxWidth={300}
        width="100%"
      >
        <Typography fontWeight={500}>{title}</Typography>
        <Typography
          fontSize={12}
          sx={{ textWrap: 'wrap' }}
        >
          {message}
        </Typography>
        <Stack
          alignItems="flex-end"
          mt={0.5}
        >
          <Typography fontSize={10}>
            {displayDateTime({ dateTime: timestamp, targetFormat: FormatDateTime.DATE_AND_FULL_TIME })}
          </Typography>
        </Stack>
      </Stack>
    </MenuItem>
  );
}

type NotificationItemProps = {
  notification: TennisAppNotification;
  onCloseMenu: () => void;
  onReadNoti: () => void;
};

export default function NotificationItem({ notification, onCloseMenu, onReadNoti }: NotificationItemProps) {
  const navigate = useNavigate();

  const handleNavigateToTournament = useCallback(
    (tournamentId: number, tabName: string) => {
      navigate(`/tournaments/${tournamentId}/${tabName}`);
      onCloseMenu();
      onReadNoti();
    },
    [navigate, onCloseMenu, onReadNoti]
  );

  switch (notification.type) {
    case NotificationType.TOURNAMENT_PARTICIPANT: {
      return (
        <NotificationStyled
          title={notification.data.title}
          message={notification.data.message}
          onClick={() => handleNavigateToTournament(notification.data.tournamentId, 'participants')}
          isRead={notification.isRead}
          timestamp={notification.timestamp}
        />
      );
    }

    case NotificationType.TOURNAMENT_SCHEDULE: {
      return (
        <NotificationStyled
          title={notification.data.title}
          message={notification.data.message}
          onClick={() => handleNavigateToTournament(notification.data.tournamentId, 'fixtures')}
          isRead={notification.isRead}
          timestamp={notification.timestamp}
        />
      );
    }

    case NotificationType.TOURNAMENT_MATCHES_SCHEDULE:
    case NotificationType.TOURNAMENT_MATCHES_ON_GOING: {
      const routeToMatch =
        notification.type === NotificationType.TOURNAMENT_MATCHES_ON_GOING
          ? `matches/${notification.data.matchId}`
          : 'matches';
      return (
        <NotificationStyled
          title={notification.data.title}
          message={notification.data.message}
          onClick={() => handleNavigateToTournament(notification.data.tournamentId, routeToMatch)}
          isRead={notification.isRead}
          timestamp={notification.timestamp}
        />
      );
    }

    case NotificationType.TOURNAMENT_FINANCES: {
      return (
        <NotificationStyled
          title={notification.data.title}
          message={notification.data.message}
          onClick={() => handleNavigateToTournament(notification.data.tournamentId, 'fund')}
          isRead={notification.isRead}
          timestamp={notification.timestamp}
        />
      );
    }

    case NotificationType.GROUP_TOURNAMENT_MATCHES_ON_GOING: {
      const routeToMatch = `groups/${notification.data.groupId}/tournaments/${notification.data.groupTournamentId}/fixtures`;

      const handleNavigate = () => {
        navigate(routeToMatch);
        onCloseMenu();
        onReadNoti();
      };

      return (
        <NotificationStyled
          title={notification.data.title}
          message={notification.data.message}
          onClick={handleNavigate}
          isRead={notification.isRead}
          timestamp={notification.timestamp}
        />
      );
    }

    default:
      throw new Error('Invalid notification type');
  }
}
