import { ServiceLevel, ServiceType } from 'constants/service';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { Service } from 'types/package';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const serviceAdminApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getServicesAdmin: build.query<
      GetListResult<Service>,
      GetPagingListOptions & {
        type?: ServiceType;
        level?: ServiceLevel;
      }
    >({
      query: ({ order, page, take, type, level }) => ({
        url: urlWithCorePrefix('services'),
        params: {
          order,
          page,
          take,
          type,
          level,
        },
      }),
    }),
    getServiceByIdAdmin: build.query<Service, string>({
      query: (id) => ({
        url: urlWithCorePrefix(`services/${id}`),
      }),
    }),
  }),
});

export const {
  useGetServicesAdminQuery,
  useLazyGetServicesAdminQuery,
  useGetServiceByIdAdminQuery,
  useLazyGetServiceByIdAdminQuery,
} = serviceAdminApiToastSlice;
