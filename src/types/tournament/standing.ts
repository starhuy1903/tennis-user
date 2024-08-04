import { TournamentFormat } from 'constants/tournament';
import { Round } from 'types/tournament-fixtures';

export type RoundRobinStanding = {
  format: TournamentFormat.ROUND_ROBIN;
  standings: {
    id: string;
    user1: {
      id: string;
      name: string;
      image: string;
    };
    user2: {
      id: string;
      name: string;
      image: string;
    } | null;
    score: {
      totalMatches: number;
      played: number;
      won: number;
      lost: number;
      matchPoints: number;
      rank: number;
    };
  }[];
};

export type KnockoutStanding = {
  format: TournamentFormat.KNOCKOUT;
  standings: {
    rounds: Round[];
  };
};

export type GroupPlayoffStanding = {
  format: TournamentFormat.GROUP_PLAYOFF;
  standings: {
    groupStage: {
      id: string;
      title: string;
      teams: {
        id: string;
        name: string;
        user1: {
          id: string;
          name: string;
          image: string;
        };
        user2: {
          id: string;
          name: string;
          image: string;
        } | null;
        score: {
          totalMatches: number;
          played: number;
          won: number;
          lost: number;
          matchPoints: number;
          rank: number;
        };
      }[];
    }[];
    knockoutStage: {
      rounds: Round[];
    };
  };
};

export type TournamentStanding = RoundRobinStanding | KnockoutStanding | GroupPlayoffStanding;

export const isRoundRobinStanding = (standing: TournamentStanding): standing is RoundRobinStanding => {
  return standing.format === TournamentFormat.ROUND_ROBIN;
};

export const isKnockoutStanding = (standing: TournamentStanding): standing is KnockoutStanding => {
  return standing.format === TournamentFormat.KNOCKOUT;
};

export const isGroupPlayoffStanding = (standing: TournamentStanding): standing is GroupPlayoffStanding => {
  return standing.format === TournamentFormat.GROUP_PLAYOFF;
};
