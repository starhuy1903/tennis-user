import { SxProps } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { IRenderSeedProps, Seed, SeedItem } from 'react-brackets';

import { MatchItem } from 'components/Authenticated/TournamentService/Common/MatchItem';
import { Match } from 'types/tournament-fixtures';

type CustomSeedItemProps = IRenderSeedProps & {
  onViewDetails: (match: Match) => void;
  onEdit: (match: Match) => void;
  canGoToMatchDetails?: boolean;
  isCreator?: boolean;
  wrapperSx?: SxProps;
  type: 'schedule' | 'matches';
  shouldShowMatchStatus?: boolean;
  isScheduleMatch?: boolean;
  shouldHighlightWinnerTeam?: boolean;
  shouldShowElo?: boolean;
};

export default function CustomSeedItem({
  seed,
  onEdit,
  onViewDetails,
  shouldShowElo = true,
  ...otherProps
}: CustomSeedItemProps) {
  const convertedMatchData = useMemo(
    () =>
      ({
        ...seed,
        matchStartDate: seed.date || '',
        teams: {
          team1: Object.keys(seed.teams[0]).length > 0 ? seed.teams[0] : null,
          team2: Object.keys(seed.teams[1]).length > 0 ? seed.teams[1] : null,
        },
      }) as Match,
    [seed]
  );

  const handleClickSeed = useCallback(() => {
    onViewDetails(convertedMatchData);
  }, [convertedMatchData, onViewDetails]);

  return (
    <Seed>
      <SeedItem
        style={{
          backgroundColor: '#f7f7f7',
          color: 'black',
          borderRadius: 16,
        }}
      >
        <MatchItem
          match={convertedMatchData}
          onEdit={() => onEdit(convertedMatchData)}
          onViewDetails={handleClickSeed}
          shouldShowElo={shouldShowElo}
          {...otherProps}
        />
      </SeedItem>
    </Seed>
  );
}
