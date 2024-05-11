import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

export default function CreatorGuardRoute() {
  const groupData = useAppSelector((state) => state.group.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (!groupData?.isCreator) {
      navigate(`/groups/${groupData?.id}`);
    }
  }, [groupData?.id, groupData?.isCreator, navigate]);

  if (groupData?.isCreator) {
    return <Outlet />;
  }

  return null;
}
