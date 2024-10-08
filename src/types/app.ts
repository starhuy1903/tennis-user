export type Service = {
  id: string;
  name: string;
  description: string;
  path: string;
};

export type OpenTournamentConfig = {
  format: string[];
  gender: string[];
  participantType: string[];
};

export type GroupTournamentConfig = {
  format: string[];
  gender: string[];
  participantType: string[];
};

export type AppConfigType = {
  services: Service[];
  openTournament: OpenTournamentConfig | null;
  groupTournament: GroupTournamentConfig | null;
};
