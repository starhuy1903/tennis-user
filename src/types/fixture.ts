import { TournamentFormat } from 'constants/tournament';

import { Match } from './match';

export type GeneratedFixturePayload = {
  tournamentId: number;
  format: TournamentFormat;
  numberOfParticipants: number;
  numberOfRound: number;
  fixtureStartDate: string;
  fixtureEndDate: string;
  matchesStartTime: string;
  matchesEndTime: string;
  matchDuration: number;
  breakDuration: number;
};

export enum FixtureStatus {
  NEW = 'new',
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export type EmptyFixture = {
  status: FixtureStatus.NEW;
};

export type DraftFixture = {
  status: FixtureStatus.DRAFT;
  matches: Match[];
};

export type PublishedFixture = {
  status: FixtureStatus.PUBLISHED;
};

export type Fixture = EmptyFixture | DraftFixture | PublishedFixture;
