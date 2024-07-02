import { useAppSelector } from 'store';

import { selectGroup } from 'store/slice/groupSlice';

import CreatorFixture from './Creator';
import ParticipantFixture from './Participant';

export default function Fixtures() {
  const groupData = useAppSelector(selectGroup);

  if (groupData.isCreator) {
    return <CreatorFixture />;
  }

  return <ParticipantFixture />;
}
