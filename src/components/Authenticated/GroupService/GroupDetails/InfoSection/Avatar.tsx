import MuiAvatar from '@mui/material/Avatar';

interface AvatarProps {
  src?: string;
  alt: string;
}

const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <MuiAvatar
      alt={alt}
      src={src}
      sx={{ width: '80px', height: '80px' }}
    />
  );
};

export default Avatar;
