import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

type RefereeCardProps = {
  image: string;
  name: string;
};

export default function RefereeCard({ image, name }: RefereeCardProps) {
  return (
    <Card sx={{ width: 300, justifyContent: 'start', background: deepPurple[50] }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={image}
          />
          <Box>
            <Typography>{name}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
