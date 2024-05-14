import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import { selectGroup } from 'store/slice/groupSlice';

export default function CreatorGuardRoute() {
  const groupData = useAppSelector(selectGroup);
  const navigate = useNavigate();

  useEffect(() => {
    if (!groupData.isCreator) {
      navigate(`/groups/${groupData.id}`);
    }
  }, [groupData.id, groupData.isCreator, navigate]);

  if (groupData.isCreator) {
    return <Outlet />;
  }

  return null;
}
