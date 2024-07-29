export type Expense = {
  id: number;
  type: 'expense';
  categories: string[];
  amount: number;
  description: string;
  createdAt: string;
};

export type GeneralFinanceInfo = {
  balance: number;
  currentFund: {
    id: string;
    title: string;
    currentAmount: number;
    targetAmount: number;
  } | null;
};
