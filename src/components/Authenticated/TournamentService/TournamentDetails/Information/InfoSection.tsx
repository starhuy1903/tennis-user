import { Box, Divider, Typography } from '@mui/material';

export default function InfoSection({
  title,
  fields,
}: {
  title: string;
  fields: {
    label: string;
    value: string;
    variant?: 'email' | 'phone';
  }[];
}) {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6">{title}</Typography>

      <Divider
        sx={{
          my: 1,
        }}
      />

      {fields.map((field, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '45%',
              color: 'gray',
              pl: 2,
              pr: 1,
              py: 1,
            }}
          >
            <Typography variant="caption">{field.label}</Typography>
            <Typography variant="caption">:</Typography>
          </Box>
          {field?.variant === 'phone' ? (
            <a
              href={`tel:${field.value}`}
              style={{ textDecoration: 'none', color: '#7F56D9' }}
            >
              <Typography variant="subtitle2">{field.value}</Typography>
            </a>
          ) : field?.variant === 'email' ? (
            <a
              href={`mailto:${field.value}`}
              style={{ textDecoration: 'none', color: '#7F56D9' }}
            >
              <Typography variant="subtitle2">{field.value}</Typography>
            </a>
          ) : (
            <Typography variant="subtitle2">{field.value}</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
