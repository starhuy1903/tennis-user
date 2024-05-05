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
      sx={{ width: '120px', height: '120px' }}
    />
  );
};

export default Avatar;
