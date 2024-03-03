import Select, { SelectProps } from '@mui/material/Select';

const CustomSelect = (props: SelectProps) => {
  return (
    <Select
      {...props}
      MenuProps={{
        slotProps: {
          paper: {
            sx: {
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
                padding: '0px 2px',
              },

              '&::-webkit-scrollbar-track': {
                backgroundColor: (theme) => theme.palette.grey[200],
              },

              '&::-webkit-scrollbar-thumb': {
                border: '2px solid transparent',
                borderRadius: '4px',
                backgroundClip: 'padding-box',
                backgroundColor: (theme) => theme.palette.primary.main,
              },

              '&::-webkit-scrollbar-track-piece': {
                borderColor: 'transparent',
                backgroundColor: 'transparent',
              },
            },
          },
        },
      }}
    />
  );
};

export default CustomSelect;
