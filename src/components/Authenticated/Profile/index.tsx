import Box from '@mui/material/Box';

import PacksSection from './components/PacksSection';
import ProfileSection from './components/ProfileSection';

const Profile = () => {
  return (
    <>
      <ProfileSection />
      <Box sx={{ marginTop: '15px' }}>
        <PacksSection />
      </Box>
    </>
  );
};

export default Profile;
