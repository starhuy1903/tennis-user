export const getKnockoutRoundName = (numRounds: number) => {
  const roundNames = [];

  // Generate generic round names
  for (let i = 1; i <= numRounds - 3; i++) {
    roundNames.push(`Round ${i}`);
  }

  // Add specific round names for the last three rounds
  if (numRounds >= 3) roundNames.push('Quarterfinals');
  if (numRounds >= 2) roundNames.push('Semifinals');
  if (numRounds >= 1) roundNames.push('Finals');

  return roundNames.slice(-numRounds);
};
