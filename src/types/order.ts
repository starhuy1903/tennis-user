import { OrderStatus, PaymentPartner } from 'constants/order';

import { BaseType } from './base';
import { Package } from './package';

export type Order = BaseType & {
  id: string;
  userId: string;
  packageId: number;
  price: number;
  status: OrderStatus;
  package: Package;
  createdAt: string;
  updatedAt: string;
};

export type PaymentResponse = {
  url: string;
};

export type CreateOrderPayload = {
  packageId: number;
  userId: string;
  partner: PaymentPartner;
};

export type CreateOrderResponse = {
  order: Order;
  payment: PaymentResponse;
};
