export type OrderStatistic = {
  orderSum: number;
  orderSumByYear: number;
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
};
