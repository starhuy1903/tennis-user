export type OrderStatistic = {
  totalRevenue: number;
  totalUsers: number;
  totalOrderSum: number;
  orderSumByYear: number;
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
};
