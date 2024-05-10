import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { displayDistanceFromNow } from 'utils/datetime';

export const Timer = ({ date }: { date: string }) => {
  const [time, setTime] = useState(displayDistanceFromNow(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(displayDistanceFromNow(date));
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return <Typography variant="h6">{time}</Typography>;
};
