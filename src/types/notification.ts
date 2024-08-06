export enum NotificationType {
  TOURNAMENT_PARTICIPANT = 'tournament_participant',
  TOURNAMENT_SCHEDULE = 'tournament_schedule',
  TOURNAMENT_MATCHES_SCHEDULE = 'tournament_matches_schedule',
  TOURNAMENT_MATCHES_ON_GOING = 'tournament_matches_on_going',
  TOURNAMENT_FINANCES = 'tournament_finances',
  GROUP_TOURNAMENT_MATCHES_ON_GOING = 'group_tournament_matches_on_going',
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

type TournamentFinancesNoti = BaseNotification & {
  type: NotificationType.TOURNAMENT_FINANCES;
  data: {
    tournamentId: number;
    title: string;
    message: string;
  };
};

type TournamentNotification =
  | TournamentParticipantNoti
  | TournamentScheduleNoti
  | TournamentMatchesNoti
  | TournamentFinancesNoti;

type GroupTournamentMatchesNoti = BaseNotification & {
  type: NotificationType.GROUP_TOURNAMENT_MATCHES_ON_GOING;
  data: {
    groupId: number;
    groupTournamentId: number;
    matchId: string;
    title: string;
    message: string;
  };
};

type GroupTournamentNotification = GroupTournamentMatchesNoti;

export type TennisAppNotification = TournamentNotification | GroupTournamentNotification;

export type SystemNotificationResponse = {
  notiList: TennisAppNotification[];
  unreadNumber: number;
};
