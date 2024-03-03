import { SxProps } from '@mui/material/styles';

export const ScrollbarStyle: SxProps = {
  '&::-webkit-scrollbar': {
    width: '8px',
    padding: '0px 2px',
  },

  '&::-webkit-scrollbar-track': {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    backgroundColor: (theme) => theme.palette.background.default,
  },

  '&::-webkit-scrollbar-thumb': {
    border: '2px solid transparent',
    borderRadius: '4px',
    backgroundClip: 'padding-box',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    backgroundColor: (theme) => theme.palette.primary.main,
  },

  '&::-webkit-scrollbar-track-piece': {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
};
