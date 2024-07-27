// type BaseTournamentNotification = {

// }

export enum NotificationType {
  TOURNAMENT_PARTICIPANT = 'tournament_participant',
  TOURNAMENT_SCHEDULE = 'tournament_schedule',
  TOURNAMENT_MATCHES = 'tournament_matches',
  TOURNAMENT_MATCHES_SCHEDULE = 'tournament_matches_schedule',
  TOURNAMENT_MATCHES_ON_GOING = 'tournament_matches_on_going',
}

type BaseNotification = {
  id: string;
  isRead: boolean;
  timestamp: string;
};

type TournamentParticipantNoti = BaseNotification & {
  type: NotificationType.TOURNAMENT_PARTICIPANT;
  data: {
    tournamentId: number;
    title: string;
    message: string;
  };
};

type TournamentScheduleNoti = BaseNotification & {
  type: NotificationType.TOURNAMENT_SCHEDULE;
  data: {
    tournamentId: number;
    title: string;
    message: string;
  };
};

type TournamentMatchesNoti = BaseNotification & {
  type: NotificationType.TOURNAMENT_MATCHES_SCHEDULE | NotificationType.TOURNAMENT_MATCHES_ON_GOING;
  data: {
    tournamentId: number;
    matchId: string;
    title: string;
    message: string;
  };
};

type TournamentNotification = TournamentParticipantNoti | TournamentScheduleNoti | TournamentMatchesNoti;

export type TennisAppNotification = TournamentNotification;

export type SystemNotificationResponse = {
  notiList: TennisAppNotification[];
  unreadNumber: number;
};
