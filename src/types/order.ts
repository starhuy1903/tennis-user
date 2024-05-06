import { OrderStatus, PaymentPartner } from 'constants/order';

import { BaseType } from './base';

export type Order = BaseType & {
  id: string;
  userId: number;
  packageId: number;
  groupId?: number;
  price: number;
  status: OrderStatus;
};

export type PaymentResponse = {
  url: string;
};

export type CreateOrderPayload = {
  packageId: number;
  userId: number;
  partner: PaymentPartner;
};

export type CreateOrderResponse = {
  order: Order;
  payment: PaymentResponse;
};
