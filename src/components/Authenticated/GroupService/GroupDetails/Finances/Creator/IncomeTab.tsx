import { useState } from 'react';
import { useAppSelector } from 'store';

import { WrapperContainer } from 'components/Authenticated/TournamentService/TournamentDetails/Common/StyledComponent';
import CenterLoading from 'components/Common/CenterLoading';
import { useGetGroupMembersQuery } from 'store/api/group/groupApiSlice';
import { selectGroup } from 'store/slice/groupSlice';

import CreateFund from './CreateFund';
import IncomeTable from './IncomeTable';

enum View {
  FORM_CREATE_FUND,
  INCOME_TABLE,
}

export default function IncomeTab() {
  const [view, setView] = useState(View.INCOME_TABLE);
  const groupData = useAppSelector(selectGroup);

  const { isLoading, data: memberData } = useGetGroupMembersQuery({ id: groupData.id, take: 1000 });

  if (isLoading || !memberData) {
    return (
      <WrapperContainer>
        <CenterLoading />
      </WrapperContainer>
    );
  }

  return (
    <>
      {view === View.INCOME_TABLE && <IncomeTable onGoToCreateFundForm={() => setView(View.FORM_CREATE_FUND)} />}
      {view === View.FORM_CREATE_FUND && (
        <CreateFund
          onGoToIncomeTable={() => setView(View.INCOME_TABLE)}
          memberData={memberData.data}
        />
      )}
    </>
  );
}
