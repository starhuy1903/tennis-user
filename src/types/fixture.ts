import { Match } from './match';

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
