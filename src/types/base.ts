export type MessageResponse = {
  success: boolean;
  message: string;
};

export type GetListResult<T> = {
  data: Array<T>;
  totalPages?: number;
  totalCount?: number;
};

export type BaseType = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type GetPagingListOptions = {
  page: number;
  take: number;
  order?: 'asc' | 'desc';
};
