export type PurchasedPackage = {
  id: string;
  userId: number;
  expired: boolean;
  orderId: string;
  startDate: string;
  endDate: string;
  name: string;
  services: Array<any>;
};
