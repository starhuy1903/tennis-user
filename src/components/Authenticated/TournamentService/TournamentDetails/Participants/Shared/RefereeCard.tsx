import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

type RefereeCardProps = {
  image: string;
  name: string;
};

export default function RefereeCard({ image, name }: RefereeCardProps) {
  return (
    <Card
      sx={{
        width: 300,
        justifyContent: 'start',
        backgroundImage: 'linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%)',
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Avatar
            sx={{ width: 80, height: 80 }}
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
