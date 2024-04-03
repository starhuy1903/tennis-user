export type BoughtPackage = {
  id: string;
  userId: number;
  expired: boolean;
  orderId: string;
  startDate: string;
  endDate: string;
  name: string;
  services: Array<any>;
};
