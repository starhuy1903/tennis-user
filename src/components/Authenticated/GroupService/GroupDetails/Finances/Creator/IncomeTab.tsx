import { useState } from 'react';

import CreateFund from './CreateFund';
import IncomeTable from './IncomeTable';

enum View {
  FORM_CREATE_FUND,
  INCOME_TABLE,
}

export default function IncomeTab() {
  const [view, setView] = useState(View.INCOME_TABLE);

  return (
    <>
      {view === View.INCOME_TABLE && <IncomeTable onGoToCreateFundForm={() => setView(View.FORM_CREATE_FUND)} />}
      {view === View.FORM_CREATE_FUND && <CreateFund onGoToIncomeTable={() => setView(View.INCOME_TABLE)} />}
    </>
  );
}
